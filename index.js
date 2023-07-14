const express = require('express')
const createConnection = require('./database')

const app = express()

app.use(express.json())

// GET
app.get('/products', async (req, res, next) => {
  const connection = await createConnection()
  const [products] = await connection.execute('SELECT * FROM products')
    .catch(e => next(e))
  connection.end()
  return res.status(200).json(products)
})

// POST
app.post('/products', async (req, res, next) => {
  const product = req.body

  if (
    !product ||
    !product.name ||
    isNaN(Number(product.price)) ||
    isNaN(Number(product.quantity))
  ) return res.status(400).json({ error: 'Bad request' })

  const connection = await createConnection()
  const { name, price, quantity, type = '' } = product
  await connection
    .execute(`INSERT INTO products (name, price, type, quantity) VALUES ('${name}', ${price}, '${type}', ${quantity})`)
    .catch(e => next(e))
  connection.end()
  return res.status(201).json({ message: 'Product created' })
})

// PUT
app.put('/products/:id', async (req, res, next) => {
  const id = req.params.id
  const product = req.body

  if (
    !id ||
    isNaN(Number(id)) ||
    !product ||
    !product.name ||
    isNaN(Number(product.price)) ||
    isNaN(Number(product.quantity))
  ) return res.status(400).json({ error: 'Bad request' })

  const connection = await createConnection()
  const { name, price, quantity, type = '' } = product
  await connection
    .execute(`UPDATE products SET name='${name}', price=${price}, type='${type}', quantity=${quantity} WHERE id=${id}`)
    .catch(e => next(e))
  connection.end()
  return res.status(201).json({ message: 'Product updated' })
})

// DELETE
app.delete('/products/:id', async (req, res, next) => {
  const id = req.params.id

  if (!id || isNaN(Number(id))) return res.status(400).json({ error: 'Bad request' })

  const connection = await createConnection()
  await connection
    .execute(`DELETE FROM products WHERE id=${id}`)
    .catch(e => next(e))
  connection.end()
  return res.status(204).json({ message: 'Product deleted' })
})

// SERVER
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running in: localhost:${PORT}`)
})
