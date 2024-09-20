#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Book, Author, User, Comment, UserList
import random
import csv

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        # Create author instances with image URLs

        authors = [
                    {
                        "id": 1,
                        "name": "Nalan Lingling",
                        "genre": "Romance",
                        "bio": "Nalan Lingling is a prominent web author known for her captivating romance novels.",
                        "image_url": "https://images.gr-assets.com/authors/1687554817p8/22274107.jpg"
                    },
                    {
                        "id": 2,
                        "name": "Love at the Reunion",
                        "genre": "Drama, Romance",
                        "bio": "Love at the Reunion is a beloved web novelist whose works often revolve around the themes of love and reconciliation.",
                        "image_url": "https://images.pexels.com/photos/2099691/pexels-photo-2099691.jpeg?cs=srgb&dl=book-education-knowledge-2099691.jpg&fm=jpg"
                    },
                    {
                        "id": 3,
                        "name": "JQK",
                        "genre": "Fantasy, Adventure",
                        "bio": "JQK is known for writing thrilling adventure and fantasy novels that captivate readers with intricate world-building.",
                        "image_url": "https://th.bing.com/th/id/OIP.fo-2L-K5ogoIbz84PH3ksQHaJ4?rs=1&pid=ImgDetMain"
                    },
                    {
                        "id": 4,
                        "name": "Knocking Brush",
                        "genre": "Historical Romance",
                        "bio": "Knocking Brush specializes in historical romance, weaving tales of love and intrigue set in ancient times.",
                        "image_url": "https://th.bing.com/th/id/OIP.fOCI522pHfS78nCG4PBi3gHaJ4?rs=1&pid=ImgDetMain"
                    },
                    {
                        "id": 5,
                        "name": "Master An",
                        "genre": "Mystery, Thriller",
                        "bio": "Master An is a master of suspense, creating gripping thrillers and mysteries that keep readers on the edge of their seats.",
                        "image_url": "https://images.pexels.com/photos/2099691/pexels-photo-2099691.jpeg?cs=srgb&dl=book-education-knowledge-2099691.jpg&fm=jpg"
                    },
                    {
                        "id": 6,
                        "name": "NovelCamon",
                        "genre": "Science Fiction",
                        "bio": "NovelCamon is known for writing innovative science fiction stories that explore futuristic worlds and technology.",
                        "image_url": "https://th.bing.com/th/id/OIP.HJG_pKn-59So6oTRZsJ5ngHaJ4?rs=1&pid=ImgDetMain"
                    },
                    {
                        "id": 7,
                        "name": "Purple Fantasy Enchantment",
                        "genre": "Fantasy, Romance",
                        "bio": "Purple Fantasy Enchantment writes beautifully crafted fantasy romance novels that transport readers to magical realms.",
                        "image_url": "https://i.pinimg.com/originals/96/0c/10/960c10e241b48ea0b317d264803a33ac.jpg"
                    },
                    {
                        "id": 8,
                        "name": "Little Lucky Fire",
                        "genre": "Young Adult, Fantasy",
                        "bio": "Little Lucky Fire is a popular young adult fantasy author, known for creating inspiring stories filled with adventure and self-discovery.",
                        "image_url": "https://images.pexels.com/photos/2099691/pexels-photo-2099691.jpeg?cs=srgb&dl=book-education-knowledge-2099691.jpg&fm=jpg"
                    },
                    {
                        "id": 9,
                        "name": "Suji Kim",
                        "genre": "Contemporary Romance",
                        "bio": "Suji Kim is a contemporary romance author, celebrated for her emotional storytelling and relatable characters.",
                        "image_url": "https://griffinpoetryprize.com/wp-content/uploads/2022/03/2004-Kim-Suji-Kwock-photo-credit-Jill-DAlessandro-scaled.jpg"
                    }
                ]

                # Adding authors to the database
        for author_data in authors:
                    author = Author(
                        name=author_data['name'],
                        genre=author_data['genre'],
                        bio=author_data['bio'],
                        image_url=author_data['image_url']
                    )
        db.session.add(author)

                # Commit the authors to the database
        db.session.commit()

        print("Authors added to the database successfully!")

        # List of users
        users = ["Nicole", "James", "Tammy", "Nayla", "Jones", "Funnyface", "Luvreading04", "benji", "Grace", "Dora"]
        # List of books with author, title, and summary data
        books = [
                    {
                        "id": 1,
                        "author": "Nalan Lingling",
                        "title": "A Prince's Endless Indulgence",
                        "summary": "In her previous life, she was mutilated, her hands chopped, her feet severed, and her tongue plucked out; her beloved child was raised with disability and fed the flesh of his own mother.",
                        "image_url": "https://book-pic.webnovel.com/bookcover/2937966360?imageMogr2/thumbnail/600x&imageId=1717136048533"
                    },
                    {
                        "id": 2,
                        "author": "Love at the Reunion",
                        "title": "The Tycoon's Fierce Pampering of His Wife",
                        "summary": "He is Huangfu Zheng, a man at the pinnacle of power, arrogant, imperious, and living wildly without constraints.",
                        "image_url": "https://book-pic.webnovel.com/bookcover/2963254430?imageMogr2/thumbnail/600x&imageId=1718340590014"
                    },
                    {
                        "id": 3,
                        "author": "JQK",
                        "title": "Back to the Past: The Rise of the False Heiress Marrying the True Tycoon",
                        "summary": "Guzi transmigrated into a novel and became a character in a story about a true and false rich heiress.",
                        "image_url": "https://book-pic.webnovel.com/bookcover/2697133600?imageMogr2/thumbnail/600x&imageId=1710122661215"
                    },
                    {
                        "id": 4,
                        "author": "Knocking Brush",
                        "title": "The Humble Family's Daughter Has A Spatial Pocket!",
                        "summary": "With a tiger-like energy and at just 5 years old, Little Prince Xiao Moxi saw his mother dash off to the fields again, and his steamed bun-like face scrunched up in frustration.",
                        "image_url": "https://book-pic.webnovel.com/bookcover/2666073810?imageMogr2/thumbnail/600x&imageId=1712141015902"
                    },
                    {
                        "id": 5,
                        "author": "Master An",
                        "title": "Pampered Poisonous Royal Wife",
                        "summary": "She, breathtaking and indifferently gentle, soft and adorably clueless.",
                        "image_url": "https://book-pic.webnovel.com/bookcover/29130843600597505?imageMogr2/thumbnail/600x&imageId=1714460878742"
                    },
                    {
                        "id": 6,
                        "author": "NovelCamon",
                        "title": "She Became The Boss's Lady After Divorce",
                        "summary": "Tessa ran away from home to get married to the love of her life, David Winston. On David's birthday, and their three years marriage anniversary, Tessa caught David cheating on her with his childhood friend, Olivia George, a figure from a prestigious family.",
                        "image_url": "https://th.bing.com/th/id/OIP.HJG_pKn-59So6oTRZsJ5ngHaJ4?rs=1&pid=ImgDetMain"
                    },
                    {
                        "id": 7,
                        "author": "Purple Fantasy Enchantment",
                        "title": "Reborn in the Seventies: Pampered Wife, Owning some Farmland",
                        "summary": "The new book is out! Meng Yunhan has been reincarnated back to the time of 'food coupon era', a time when people struggled with food and clothe shortages.",
                        "image_url": "https://book-pic.webnovel.com/bookcover/2862104620?imageMogr2/thumbnail/600x&imageId=1708670986818"
                    },
                    {
                        "id": 8,
                        "author": "Little Lucky Fire",
                        "title": "The wealthy stepmom became wildly popular in the parenting show",
                        "summary": "Li Xingwan had transmigrated into a book, becoming a D-list celebrity scandal-ridden and already married.",
                        "image_url": "https://book-pic.webnovel.com/bookcover/2963299400?imageMogr2/thumbnail/600x&imageId=1717757222761"
                    },
                    {
                        "id": 9,
                        "author": "Suji Kim",
                        "title": "Under the Oak Tree",
                        "summary": "Stuttering lady Maximilian is forced into a marriage with Sir Riftan, but he leaves on a campaign after their wedding night.",
                        "image_url": "https://book-pic.webnovel.com/bookcover/2194958260?imageMogr2/thumbnail/600x&imageId=1674031139320"
                    }
                ]
        
                # Add books to the database
        for username in users:
            user = User.query.filter_by(username=username).first()
            if user:
                # Randomly select a book from the books_data
                book = random.choice(books)
                book = Book.query.filter_by(title=book['title'], id=book['id']).first()
                
                if book:
                    # Create a UserList entry associating the user with the book
                    userlist = UserList(
                        user_id=user.id,
                        book_id=book.id,
                        rating=random.randint(1, 5)  # Assigning a random rating between 1 and 5
                    )
                    db.session.add(userlist)

        # Commit the user list data to the database
        db.session.commit()

        print("User lists added to the database successfully!")  

        users = [
            {"id": 1, "username": "Nicole", "password": "password123"},
            {"id": 2, "username": "James", "password": "password124"},
            {"id": 3, "username": "Tammy", "password": "password125"},
            {"id": 4, "username": "Nayla", "password": "password126"},
            {"id": 5, "username": "Jones", "password": "password127"},
            {"id": 6, "username": "Funnyface", "password": "password128"},
            {"id": 7, "username": "Luvreading04", "password": "password129"},
            {"id": 8, "username": "benji", "password": "password130"},
            {"id": 9, "username": "Grace", "password": "password131"},
            {"id": 10, "username": "Dora", "password": "password132"}
        ]

        # Create user instances and add to the database
        for user in users:
            user_instance = User(
                username=user["username"],
                password=user["password"]
            )
            db.session.add(user_instance)

        # Commit the session to save the changes
        db.session.commit()

        # List of users and books
        users = ["Nicole", "James", "Tammy", "Nayla", "Jones", "Funnyface", "Luvreading04", "benji", "Grace", "Dora"]

        user_book_ratings = []

        for user_id, user_name in enumerate(users, start=1):
            for book in books:
                user_book_ratings.append({
                    "user_id": user_id,
                    "user_name": user_name,
                    "book_id": book["id"],
                    "rating": 3  # Default rating, adjust as needed
                })

        # Example output
        for entry in user_book_ratings:
            print(entry)

        # If UserList is a model or class

        for entry in user_book_ratings:
            user_instance = UserList(
                user_id=entry["user_id"],
                user_name=entry["user_name"],
                book_id=entry["book_id"],
                rating=entry["rating"]
            )
            db.session.add(user_instance)

        db.session.commit()

        user_ids = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        # Map book titles to their IDs
        title_to_id = {book["title"]: book["id"] for book in books}

        # Comments to be created
        comments = [
            {"book_title": "A Prince's Endless Indulgence", "content": "This story line maybe typical but the romance is amazing, pure and funny."},
            {"book_title": "The Tycoon's Fierce Pampering of His Wife", "content": "I love this novel."},
            {"book_title": "Back to the Past: The Rise of the False Heiress Marrying the True Tycoon", "content": "I am hooked on this storyline. I love the fact that the ML is really low key and also really treat the FL with so much love."},
            {"book_title": "The Humble Family's Daughter Has A Spatial Pocket!", "content": "I am so into this story. I wish FL could just take everything out of her spatial pocket to shut all these annoying people up."},
            {"book_title": "Pampered Poisonous Royal Wife", "content": "This story is too funny. The author really nailed it."},
            {"book_title": "She Became The Boss's Lady After Divorce", "content": "Strong FL. Strong ML. Keep it coming."},
            {"book_title": "Reborn in the Seventies: Pampered Wife, Owning some Farmland", "content": "I really like that the FL stayed the same and didn't change her character after getting rich."},
            {"book_title": "The Wealthy Stepmom Became Wildly Popular in the Parenting Show", "content": "I really love the Male lead. He is straightforward and can tell if the FL is genuine. Now he wants her. Love it."},
            {"book_title": "Under the Oak Tree", "content": "I finally started reading this novel. The ratings are perfect and the storyline is right to my taste."}
        ]

        comments_instances = []
        start_id = 1  # Adjust if you want to start with a different ID

        for idx, comment in enumerate(comments, start=start_id):
            book_id = title_to_id.get(comment["book_title"])
            user_id = user_ids[idx % len(user_ids)]  # Cycle through user_ids
            if book_id:
                comments_instances.append({
                    "id": idx,  # Ensure ID is unique
                    "book_id": book_id,
                    "user_id": user_id,
                    "content": comment["content"]
                })

        # Example output
        for entry in comments_instances:
            print(entry)


        for entry in comments_instances:
                comment_instance = Comment(
                        user_id=entry["user_id"],
                        book_id=entry["book_id"],
                        content=entry["content"]
                    )
                db.session.add(comment_instance)

        db.session.commit()