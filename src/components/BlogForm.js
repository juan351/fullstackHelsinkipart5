import React from 'react'

const BlogForm = (
    {
        newBlog, 
        newAuthor, 
        newUrl, 
        handleTitleChange, 
        handleAuthorChange, 
        handleUrlChange, 
        handleSubmit
    }
        ) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
        <div>
        title
        <input type="text"
          value={newBlog}
          name="Title"
          onChange={handleTitleChange} />
        </div>
        <div>
        author
        <input
          type="text"
          value={newAuthor}
          name="Author"
          onChange={handleAuthorChange} />
        </div>
        <div>
        url
        <input
          type="text"
          value={newUrl}
          name="Url"
          onChange={handleUrlChange} />
        </div>
        <button type="submit">create</button>
      </form>
        </div>
    )
}

export default BlogForm