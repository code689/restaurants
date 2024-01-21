const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

const restaurants = require('./public/jsons/restaurant.json').results


app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
  res.render('index', { restaurants: restaurants })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword?.trim()
  const matchedrestaurants = keyword ? restaurants.filter((rt) => {
    if (rt.category.includes(keyword)) {
      return rt.category.includes(keyword)
    }
    if (rt.name.toLowerCase().includes(keyword.toLowerCase())) {
      return rt.name.toLowerCase().includes(keyword.toLowerCase())
    }
    return false
  }) : restaurants

  res.render('index', { restaurants: matchedrestaurants, keyword })
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurants.find(restaurant => restaurant.id.toString() === id)
  res.render('detail', { restaurant })
})

app.listen(port, () => {
  console.log(`1st express server on http://localhost:${port}`)
})