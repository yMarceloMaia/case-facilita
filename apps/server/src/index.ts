import express from 'express'
import cors from 'cors'
import { calculateRouter, deleteTableClients, getClients, populateTableClients, registerClients, registerTableClients, test } from './endpoints'
import "dotenv/config"

const app = express()

app.use(cors())
app.use(express.json())

app.listen(process.env.PORT || 3003, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
})

app.get('/', test)
app.get('/clients', getClients)
app.post('/clients', registerClients)
app.get('/calculate-router', calculateRouter)


app.post('/register-table-clients', registerTableClients)
app.post('/populate-table-clients', populateTableClients)
app.delete('/delete-table-clients', deleteTableClients)

registerTableClients()