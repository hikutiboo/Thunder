# Here is my first working version of Thunder

Thunder - is a pretty simple rework of Instagram, it has no database, but can save current data, becouse of redux and react-router 
implemented here.

## Pages of this project

On Thunder you can find:

### `Register page`

Simple registration page, user ID, password, nickname and profile photo - all, what is necessary to small apps.

### `Log in page`

Just log in, notting special.

### `Switch account page`

This is a page, that makes life easier, if you already have logged into account, what is the reason to do it again? So if you did not
activated full log out you can get back to your account without entering the password.

### `Profile page`

**Note: here is one of not yet finished functions - edit account, it might came up in later editions!**

Profile page can have three states: 

#### Acoount not found

This means that you trying to got to unknow user account

#### Other user account

In this case you have default functional of profile page - you can see this user's data, subscribe button and all his posts. Click on post
will allow you to see the full version of it, read the description, read, write and like existing comments and, of course, like the post.

#### **About the posts - you can currently create only one-pictured post, that contain only photos, not a videos, but it would change later**

#### Your account

On your account page we have some changes:
- "New post" instead of subscribe button,
- edit account button, that is not finished yet;

### `Home page`

First of sidebar navigation.

Here is display of all posts, with full functionality of post, that was described higher.

**Note: if you add post with any other way that is not the "New post" button - you would not see it on home page, becouse posts on home uses different data store with account posts**

### `Search page`

Second sidebar navigation item.

This page contains pretty simple, but required functionality for resoures like that - search. For now you can find only account, but it might contain posts searching by hashtags later. So, about current version you can find anyone by user ID or nickname, as you would preffer to.

### `Messages page`

Third of sidebar navigation.

The last one page of available now, and, unfortunately, not done. I mean the page by itself is ready to use and can do everything that should, problem is that there is no any logic on resourse to create that messages, and they realization is pretty bad, becouse they contain too little information, so they are useless, but this is one of the first in list of changes in next versions!