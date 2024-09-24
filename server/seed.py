from random import randint, choice as rc
from config import db
from app import app
from models import db, Book, Author, User, Comment, UserList





def create_authors():
    with app.app_context():
        authors = [
            Author(
                name= "Nalan Lingling",
                genre= "Romance",
                bio= "Nalan Lingling is a prominent web author known for her captivating romance novels.",
                image_url= "https://images.gr-assets.com/authors/1687554817p8/22274107.jpg"
        ),
            Author(
                name= "Love at the Reunion",
                genre= "Drama, Romance",
                bio= "Love at the Reunion is a beloved web novelist whose works often revolve around the themes of love and reconciliation.",
                image_url= "https://images.creativemarket.com/0.1.0/ps/185318/1360/1961/m1/fpnw/wm1/zpf4avd3h1pcb8yaeqlqagtypmhikgruyrz8r5lomad88qwhjiwqdqsjbrlbsk5b-.jpg?1410793061&s=4cde43180370554b2495810664251627"
        ),
            Author(
                name= "JQK",
                genre= "Fantasy, Adventure",
                bio= "JQK is known for writing thrilling adventure and fantasy novels that captivate readers with intricate world-building.",
                image_url= "https://th.bing.com/th/id/OIP.fo-2L-K5ogoIbz84PH3ksQHaJ4?rs=1&pid=ImgDetMain"
        ),           
            Author(
                name= "Knocking Brush",
                genre= "Historical Romance",
                bio= "Knocking Brush specializes in historical romance, weaving tales of love and intrigue set in ancient times.",
                image_url= "https://th.bing.com/th/id/OIP.fOCI522pHfS78nCG4PBi3gHaJ4?rs=1&pid=ImgDetMain"
        ),            
            Author(
                name= "Master An",
                genre= "Mystery, Thriller",
                bio= "Master An is a master of suspense, creating gripping thrillers and mysteries that keep readers on the edge of their seats.",
                image_url= "https://images.creativemarket.com/0.1.0/ps/185318/1360/1961/m1/fpnw/wm1/zpf4avd3h1pcb8yaeqlqagtypmhikgruyrz8r5lomad88qwhjiwqdqsjbrlbsk5b-.jpg?1410793061&s=4cde43180370554b2495810664251627"
        ),            
            Author(
                name= "NovelCamon",
                genre= "Science Fiction",
                bio= "NovelCamon is known for writing innovative science fiction stories that explore futuristic worlds and technology.",
                image_url= "https://th.bing.com/th/id/OIP.HJG_pKn-59So6oTRZsJ5ngHaJ4?rs=1&pid=ImgDetMain"
        ),           
            Author(
                name= "Purple Fantasy Enchantment",
                genre= "Fantasy, Romance",
                bio= "Purple Fantasy Enchantment writes beautifully crafted fantasy romance novels that transport readers to magical realms.",
                image_url= "https://i.pinimg.com/originals/96/0c/10/960c10e241b48ea0b317d264803a33ac.jpg"
        ),            
            Author(
                name= "Little Lucky Fire",
                genre= "Young Adult, Fantasy",
                bio= "Little Lucky Fire is a popular young adult fantasy author, known for creating inspiring stories filled with adventure and self-discovery.",
                image_url= "https://images.creativemarket.com/0.1.0/ps/185318/1360/1961/m1/fpnw/wm1/zpf4avd3h1pcb8yaeqlqagtypmhikgruyrz8r5lomad88qwhjiwqdqsjbrlbsk5b-.jpg?1410793061&s=4cde43180370554b2495810664251627"
        ),            
        ]            
        db.session.bulk_save_objects(authors)
        db.session.commit()  # Commit here to ensure authors are in the session

        

def create_books():
    with app.app_context():
        authors = {
            name: Author.query.filter_by(name=name).first()
            for name in [
                "Nalan Lingling", "Love at the Reunion", "JQK", 
                "Knocking Brush", "Master An", "NovelCamon", 
                "Purple Fantasy Enchantment", "Little Lucky Fire"
            ]
        }
        if any(author is None for author in authors.values()):
            raise ValueError("One or more authors were not found in the database.")

        
        books = [
            Book( author=authors["Nalan Lingling"], title="A Prince's Endless Indulgence", summary="In her previous life, ...", image_url="https://th.bing.com/th/id/OIP.5QFMUWxvMdJFjr85wIw4egAAAA?rs=1&pid=ImgDetMain"),
            Book( author=authors["Love at the Reunion"], title="The Tycoon's Fierce Pampering of His Wife", summary="He is Huangfu Zheng...", image_url="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1568095430l/53030953.jpg"),
            Book( author=authors["JQK"], title="Back to the Past: The Rise of the False Heiress...", summary="Guzi transmigrated into a novel...", image_url="https://th.bing.com/th/id/OIP.IhL3tZhzCwy7lpoiX6fTcAHaJ4?rs=1&pid=ImgDetMain"),
            Book( author=authors["Knocking Brush"], title="The Humble Family’s Daughter Has A Spatial Pocket!", summary="With a tiger-like energy...", image_url="https://oregairu.b-cdn.net/wp-content/uploads/2024/09/the-humble-familys-daughter-has-a-spatial-pocket-193x278.jpg"),
            Book( author=authors["Master An"], title="Pampered Poisonous Royal Wife", summary="She, breathtaking and indifferently gentle...", image_url="https://img.wtr-lab.com/cdn/series/LNlzcLIp_GSAFMbWzT_XTg.jpg"),
            Book( author=authors["NovelCamon"], title="She Became The Boss's Lady After Divorce", summary="Tessa ran away from home...", image_url="https://th.bing.com/th/id/OIP.PJ0PyRXOXD-2gqlfs4RG-wHaHa?rs=1&pid=ImgDetMain"),
            Book( author=authors["Purple Fantasy Enchantment"], title="Reborn in the Seventies: Pampered Wife...", summary="The new book is out!...", image_url="https://th.bing.com/th/id/OIP.GUXcERCo2_MQ_SnLrkvz7AAAAA?rs=1&pid=ImgDetMain"),
            Book( author=authors["Little Lucky Fire"], title="The wealthy stepmom became wildly popular...", summary="Li Xingwan had transmigrated into a book...", image_url="https://ik.imagekit.io/storybird/images/e2307839-0815-49f5-b883-10b480005981/0_985319130.png")
        ]
        db.session.add_all(books)


        db.session.commit()
        
def create_users():
    with app.app_context():  

        users = [
            User(username="Nicole", password="password123"),
            User(username="James", password="password124"),
            User(username="Tammy", password="password125"),
            User(username="Nayla", password="password126"),
            User(username="Jones", password="password127"),
            User(username="Funnyface", password="password128"),
            User(username="Luvreading04", password="password129"),
            User(username="benji", password="password130"),
            User(username="Grace", password="password131"),
            User(username="Dora", password="password132")
        ]

        # Add the users to the session
        db.session.bulk_save_objects(users)

        # Commit the changes
        db.session.commit()

        user_ids = {user.username: user.id for user in User.query.all()}  # Fixing key retrieval
        return user_ids

def create_comments(user_ids):
    with app.app_context():
        # Define a dictionary of comments and their corresponding books
        books_with_comments = {
            "This book had me hooked for a long time!": {
                "book": Book.query.filter_by(title="A Prince's Endless Indulgence").first(),
                "image_url": "https://th.bing.com/th/id/OIP.5QFMUWxvMdJFjr85wIw4egAAAA?rs=1&pid=ImgDetMain"
            },
            "I need the RAW title to this book. I can't put it down": {
                "book": Book.query.filter_by(title="The Tycoon's Fierce Pampering of His Wife").first(),
                "image_url": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1568095430l/53030953.jpg"
            },
            "The FL is my cup of tea. Although the FL is smart, I still like how the ML is strong as well.": {
                "book": Book.query.filter_by(title="The Humble Family's Daughter Has A Spatial Pocket!").first(),
                "image_url":"https://oregairu.b-cdn.net/wp-content/uploads/2024/09/the-humble-familys-daughter-has-a-spatial-pocket-193x278.jpg"
            },
            "I need more coins for this book :(.": {
                "book": Book.query.filter_by(title="Pampered Poisonous Royal Wife").first(),
                "image_url": "https://img.wtr-lab.com/cdn/series/LNlzcLIp_GSAFMbWzT_XTg.jpg"
            },
            "This book is on FIIIRRRE!": {
                "book": Book.query.filter_by(title="She Became The Boss's Lady After Divorce").first(),
                "image_url": "https://th.bing.com/th/id/OIP.PJ0PyRXOXD-2gqlfs4RG-wHaHa?rs=1&pid=ImgDetMain"
            },
            "Please share the RAW title": {
                "book": Book.query.filter_by(title="Reborn in the Seventies: Pampered Wife, Owning some Farmland").first(),
                "image_url": "https://th.bing.com/th/id/OIP.GUXcERCo2_MQ_SnLrkvz7AAAAA?rs=1&pid=ImgDetMain"
            },
            "This was by far the funniest book I've read!": {
                "book": Book.query.filter_by(title="The wealthy stepmom became wildly popular in the parenting show").first(),
                "image_url": "https://ik.imagekit.io/storybird/images/e2307839-0815-49f5-b883-10b480005981/0_985319130.png"
            }
        }
        
        comments = []
        for title, book_info in books_with_comments.items():
            book = book_info["book"]
            image_url = book_info["image_url"]
            
            if book:  # Ensure the book exists before creating comments
                for user_id in user_ids:
                    # Add the image_url for each comment (if available)
                    comments.append(Comment(
                        book_id=book.id,
                        content=f"Comment: {title}.",
                        user_id=user_id,
                        image_url=image_url
                    ))

        # Save the comments to the database
        db.session.bulk_save_objects(comments)
        db.session.commit()

def create_user_lists():
    with app.app_context():
        # Assuming you already have users and books created
        users = {
            "Nicole": User.query.filter_by(username="Nicole").first(),
            "James": User.query.filter_by(username="James").first(),
            "Tammy": User.query.filter_by(username="Tammy").first(),
            "Nayla": User.query.filter_by(username="Nayla").first(),
            "Jones": User.query.filter_by(username="Jones").first(),
            "Funnyface": User.query.filter_by(username="Funnyface").first(),
            "Luvreading04": User.query.filter_by(username="Luvreading04").first(),
            "benji": User.query.filter_by(username="benji").first(),
            "Grace": User.query.filter_by(username="Grace").first(),
            "Dora": User.query.filter_by(username="Dora").first()
        }
        
        books = {
            "A Prince's Endless Indulgence": Book.query.filter_by(title="A Prince's Endless Indulgence").first(),
            "The Tycoon's Fierce Pampering of His Wife": Book.query.filter_by(title="The Tycoon's Fierce Pampering of His Wife").first(),
            "The Humble Family's Daughter Has A Spatial Pocket!": Book.query.filter_by(title="The Humble Family's Daughter Has A Spatial Pocket!").first(),
            "Pampered Poisonous Royal Wife": Book.query.filter_by(title="Pampered Poisonous Royal Wife").first(),
            "She Became The Boss's Lady After Divorce": Book.query.filter_by(title="She Became The Boss's Lady After Divorce").first(),
            "Reborn in the Seventies: Pampered Wife...": Book.query.filter_by(title="Reborn in the Seventies: Pampered Wife...").first(),
            "The wealthy stepmom became wildly popular...": Book.query.filter_by(title="The wealthy stepmom became wildly popular...").first()
        }
        
        # Creating UserList entries
        user_lists = []
        for user in users.values():
            for book in books.values():
                if user and book:
                    user_lists.append(UserList(user_id=user.id, book_id=book.id, rating=randint(1, 5)))

        db.session.bulk_save_objects(user_lists)
        db.session.commit()

def read_books():
    with app.app_context():
        return Book.query.all()

def read_authors():
    with app.app_context():
        return Author.query.all()
    
def read_comments():
    with app.app_context():
        return Comment.query.all()
    
def delete_authors():
    with app.app_context():
        Author.query.delete()
        db.session.commit()


def delete_books():
    with app.app_context():
        Book.query.delete()
        db.session.commit()

def delete_users():
    with app.app_context():
        User.query.delete()
        db.session.commit()

def delete_comments():
    with app.app_context():
        Comment.query.delete()
        db.session.commit()
        

def delete_user_lists():
    with app.app_context():
        UserList.query.delete()
        db.session.commit()


if __name__ == '__main__':# Clear the books table
    delete_authors()
    delete_books()
    delete_users()
    delete_comments()
    delete_user_lists()
    create_authors()
    create_books()
    user_ids = create_users()  # Get user ids
    create_comments(user_ids,)
    create_user_lists()

