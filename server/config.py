# Standard library imports

# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv

import os

# Load environment variables from a .env file
load_dotenv()

# Instantiate app and set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = os.getenv("FLASK_SECRET_KEY")

# Define metadata with a naming convention for foreign keys
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

# Instantiate SQLAlchemy and Migrate
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)

# Initialize the database with the app
db.init_app(app)

# Instantiate REST API
api = Api(app)

# Initialize Bcrypt
bcrypt = Bcrypt(app)

# Instantiate CORS to allow requests from the specified origin
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Run the app
if __name__ == "__main__":
    app.run(debug=True)