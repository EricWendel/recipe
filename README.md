# Recipe

## Goal

    Create a web app using Nextjs to let users post and view recipes

## .env

    GOOGLE_CLIENT_ID= Google Cloud app id for oauth
    GOOGLE_CLIENT_SECRET= Google Cloud app secret for oath
    NEXTAUTH_URL= Url of website once deployed
    NEXTAUTH_SECRET= generate and copy/paste using $ openssl rand -base64 32
    DATABASE_URL= url of postgresql database with "?connect_timeout=300" added to the end
    SHADOW_DATABASE_URL= a second postgress database url
