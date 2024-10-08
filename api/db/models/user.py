from pydantic import BaseModel, EmailStr, Field
from typing import Optional,Tuple
from datetime import datetime
from db.models import PyObjectId
from bson import ObjectId
from integrations.db.mongo import Mongo


class UserModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id")
    name: str
    email: EmailStr  # Pydantic validation for email addresses
    picture: Optional[str] = Field(None, alias='profile_pic')
    new_user: bool
    provider: str
    firebase_id: str
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True  # To allow loading data directly from Peewee model
        allow_population_by_field_name = True  # Allow `profile_pic` alias to be used
        json_encoders = {ObjectId: str}

# Method to save or update the user in the database
    def save(self) -> str:
        user_data = self.dict(by_alias=True, exclude_unset=True)
        if self.id:
            # Update existing document
            Mongo.collection.user.update_one({"_id": self.id}, {"$set": user_data})
        else:
            # Insert new document
            result = Mongo.collection.user.insert_one(user_data)
            self.id = result.inserted_id  # Set the ObjectId after insertion
        return str(self.id)

    @classmethod
    def get_or_create(cls, **kwargs) -> Tuple["UserModel", bool]:
        """
        Get or create a user. If the user exists, return the instance and False.
        If the user doesn't exist, create and return the instance and True.
        :param kwargs: Fields to filter by (e.g., email).
        :return: A tuple of (UserModel instance, created_bool)
        """
        user = Mongo.collection.user.find_one(kwargs)  # Try to find the user by kwargs
        if user:
            return cls(**user), False  # Return the existing user and 'False' (not created)

        # Create a new user if not found
        new_user = cls(**kwargs)
        new_user.save()  # Save to the database
        return new_user, True  # Return the new user and 'True' (created)
