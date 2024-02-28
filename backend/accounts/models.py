""" Define the data models for api applications
"""
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, \
    PermissionsMixin, BaseUserManager


class UserAccountManager(BaseUserManager):
    """creating a manager for a custom user model
    """
    def create_user(self, email, password=None, **extra_fields):
        """Creates user and returns the user
        """
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """Create and return a `User` with superuser (admin) permissions.
        """
        if password is None:
            raise TypeError('Superusers must have a password.')

        email = self.normalize_email(email)
        user = self.create_user(email=email, **extra_fields)
        user.set_password(password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    """Define custom user inherited from AbstractUser
    """
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=15)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'phone', 'is_staff']

    def get_full_name(self):
        """Returns full name
        """
        return self.first_name + self.last_name

    def get_short_name(self):
        """Returns short name
        """
        return self.first_name

    def __str__(self):
        """Returns string representation of this object
        """
        return self.email

    def to_dict(self):
        """Returns a dictionary containing all keys/values of the instance
        """
        new_dict = self.__dict__.copy()
        if "_state" in new_dict:
            del new_dict["_state"]
        return new_dict


class Region(models.Model):
    """Defines Region model
    """
    name = models.CharField(max_length=20)


class CompTypes(models.Model):
    """Defines complaint types model
    """
    name = models.CharField(max_length=20)


class Complaint(models.Model):
    """Defines complaint model
    """
    email = models.EmailField()
    image = models.ImageField(upload_to='images')
    proof = models.ImageField(upload_to='images')
    status = models.CharField(max_length=20, default="Pending")
    compTitle = models.CharField(max_length=128)
    city = models.CharField(max_length=20)
    subCity = models.CharField(max_length=20)
    landmark = models.CharField(max_length=20)
    desc = models.CharField(max_length=300)
    region = models.CharField(max_length=20)
    compType = models.CharField(max_length=20)
    compSev = models.CharField(max_length=20)

    def to_dict(self):
        """Returns a dictionary containing all keys/values of the instance
        """
        new_dict = self.__dict__.copy()
        if "_state" in new_dict:
            del new_dict["_state"]
        return new_dict
