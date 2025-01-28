# Blog Filtering Bug: Problem & Solution Documentation

## Initial Problem
I had a blog application where users could create and view blogs. The issue was that all users could see everyone's blogs instead of just their own. I needed to filter the blogs so users would only see their personal blogs.

## Data Structure
My API endpoints looked like this:

1. Users endpoint (`/api/users`):
```json
{
    "name": "Michael Scott",
    "username": "prisonmike",
    "blogs": ["67837d1299854589f396d114"],
    "id": "67837ca299854589f396d10c"
}
```

2. Blogs endpoint (`/api/blogs`):
```json
{
    "author": "Test mike",
    "title": "Mike mike",
    "url": "testmike.com",
    "likes": 0,
    "user": [{
        "name": "Michael Scott",
        "username": "prisonmike",
        "id": "67837ca299854589f396d10c"
    }],
    "id": "67837d1299854589f396d114"
}
```

## The Journey to the Solution

### First Attempt
I tried filtering blogs in the BlogList component by comparing the blog's user ID with the current user's ID. However, this led to two issues:
1. No blogs showing after page reload
2. Only newly created blogs appearing, with all previous blogs disappearing

### Root Cause Discovered
After adding console logs, we found that the user object in my application didn't contain the ID field. The user object looked like this:
```javascript
{
    token: "eyJhbGci...",
    username: "prisonmike",
    name: "Michael"
    // Missing ID!
}
```

But the blog's user array contained objects with IDs. This mismatch meant the filtering never worked because it was comparing an ID (from the blog) with undefined (from the user).

### The Solution
1. Modified the login handler to include the user ID:
```javascript
const handleLogin = async (event) => {
    const user = await loginService.login({ username, password });
    const decodedToken = JSON.parse(atob(user.token.split('.')[1]));
    const userWithId = {
        ...user,
        id: decodedToken.id  // Added the ID from the token
    };
    window.localStorage.setItem("loggedBlogUser", JSON.stringify(userWithId));
    setUser(userWithId);
};
```

2. Updated the user check in useEffect:
```javascript
useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        if (!user.id) {
            const decodedToken = JSON.parse(atob(user.token.split('.')[1]));
            user.id = decodedToken.id;
        }
        setUser(user);
    }
}, []);
```

3. Fixed the blog filtering in BlogList:
```javascript
const userBlogs = blogs.filter(blog => {
    return blog.user.some(blogUser => blogUser.id === user.id);
});
```

## Key Learnings
1. The JWT token contained the user ID all along - I just needed to decode it
2. When comparing IDs, both sides need to have the ID field
3. Console logging the actual data structures helped identify the mismatch
4. The user object needed to be complete (with ID) before being stored in localStorage

## For Future Reference
If I encounter similar issues:
1. Check the data structure of both sides being compared
2. Look at what's actually stored in localStorage
3. Decode JWT tokens to see what information they contain
4. Use console logs to track the data flow