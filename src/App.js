import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog,
      author: newAuthor,
      url: newUrl
    }

    const response = await blogService.create(blogObject)
    setBlogs(blogs.concat(response))
    setNewBlog('')
    setNewAuthor('')
    setNewUrl('')      
    setMessage({ message: 'added', text: `New blog added: ${newBlog}`})
      setTimeout(() => {
        setMessage(null)
      }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception){
      setMessage({ message: 'error', text: 'Wrong username or password'})
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <><h2>log in to application</h2><form onSubmit={handleLogin}>
      <Notification message={message} />
      <div>
        username
        <input type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form></>
  )

  const handleLogOut = () => {
    loginService.logout('loggedBlogappUser')
    setUser(null)
  }

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <Togglable buttonLabel='create new blog'>
      <BlogForm
      newBlog={newBlog}
      newAuthor={newAuthor}
      newUrl={newUrl}
      handleTitleChange={({ target }) => setNewBlog(target.value)}
      handleAuthorChange={({ target }) => setNewAuthor(target.value)}
      handleUrlChange={({ target }) => setNewUrl(target.value)}
      handleSubmit={addBlog}
      />
      </Togglable>
      <p>{user.name} logged in <button type="submit" onClick={handleLogOut}>log out</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>    
  )

  return (
    user === null ?
      loginForm():
      blogList()
  )
}

export default App