import express from 'express'
import { createConnection } from './database.js'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

// GET
app.get('/products', async (req, res, next) => {
  const connection = createConnection()
  const result = await connection.execute('SELECT * FROM products ORDER BY name ASC')
    .catch(e => next(e))
  connection.close()
  return res.status(200).json(result.rows)
})
app.get('/types', async (req, res, next) => {
  const connection = await createConnection()
  const result = await connection.execute('SELECT * FROM types')
    .catch(e => next(e))
  connection.close()
  return res.status(200).json(result.rows)
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

  const connection = createConnection()
  const { name, price, quantity, type_id = null } = product
  const typeId = isNaN(Number(type_id)) ? null : type_id

  await connection
    .execute(`INSERT INTO products (name, price, quantity, type_id) VALUES ('${name}', ${price}, ${quantity}, ${typeId})`)
    .catch(e => next(e))
  connection.close()
  return res.status(201).json({ message: 'Product created' })
})
app.post('/types', async (req, res, next) => {
  const typeRequest = req.body

  if (!typeRequest?.type) return res.status(400).json({ error: 'Bad request' })

  const connection = createConnection()
  const { type } = typeRequest
  await connection
    .execute(`INSERT INTO types (type) VALUES ('${type}')`)
    .catch(e => next(e))
  connection.close()
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

  const connection = createConnection()
  const { name, price, quantity, type_id } = product
  const typeId = isNaN(Number(type_id)) ? null : type_id

  await connection
    .execute(`UPDATE products SET name='${name}', price=${price}, quantity=${quantity}, type_id=${typeId} WHERE id=${id}`)
    .catch(e => next(e))
  connection.close()
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
  connection.close()
  return res.status(204).json({ message: 'Product deleted' })
})

// SERVER
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running in: localhost:${PORT}`)
})
