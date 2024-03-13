import { Request, Response } from "express";
import { ClientSchema } from "./client.dto";
import pool from "./database/db";
import { Client, nearestNeighbor } from "./models/Client";
import { ZodError } from "zod";
import "dotenv/config"

export const test = (req: Request, res: Response) => {
    res.status(200).send('ok')
}

// endpoint para pegar dados de todos os clientes
export const getClients = async (req: Request, res: Response) => {
    try {
        const clients: any = await pool.query('SELECT * FROM clients');
        res.json(clients.rows);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).send('Erro ao buscar clientes.');
    }
}

// endpoint para registrar clientes no banco de dados
export const registerClients = async (req: Request, res: Response) => {
    try {
        const inputData = req.body
        const clientData = ClientSchema.parse(inputData)

        const { name, email, phone_number, coordinate_x, coordinate_y } = clientData;

        await pool.query(
            'INSERT INTO clients(name, email, phone_number, coordinate_x, coordinate_y) VALUES($1, $2, $3, $4, $5) RETURNING *',
            [name, email, phone_number, coordinate_x, coordinate_y]
        );

        res.status(201).json({ success: true, message: 'Cliente cadastrado com sucesso' })
    } catch (error: any) {
        console.log(error)
        if (error instanceof ZodError) {
            console.log({ error })
            res.status(400).send(error.message)
        } else {
            res.status(500).send(error.message);
        }

    }
}

export const calculateRouter = async (req: Request, res: Response) => {
    try {
        const clientsDb: any = await pool.query('SELECT * FROM clients');
        const clients = []

        for (let client of clientsDb.rows) {
            const newClient = new Client(
                client.id,
                client.name,
                client.coordinate_x,
                client.coordinate_y
            )
            clients.push(newClient)
        }

        const response = nearestNeighbor(clients)

        res.status(200).json(response)
    } catch (error: any) {
        console.log(error)
        res.status(500).send(error.message);
    }
}

// MANIPULAÇÃO DO BANCO DE DADOS

// Função para criar tabela 'clients' no banco de dados
export const registerTableClients = async (req?: Request, res?: Response) => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS clients (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            phone_number VARCHAR(20) NOT NULL,
            coordinate_x DOUBLE PRECISION,
            coordinate_y DOUBLE PRECISION
        );`);

        res?.status(201).send('ok')
    } catch (error) {
        console.error('Erro ao criar tabela clientes:', error);
        res?.status(500).send(error)
    }
}

// endpoint para popular tabela de clientes
export const populateTableClients = async (req: Request, res: Response) => {
    try {
        await pool.query(`
        INSERT INTO clients (name, email, phone_number, coordinate_x, coordinate_y)
        VALUES
          ('Cliente A', 'cliente_a@example.com', '123456789', 1.5, 2.5),
          ('Cliente B', 'cliente_b@example.com', '987654321', -3.0, 4.0),
          ('Cliente C', 'cliente_c@example.com', '555111222', 0.0, 1.0),
          ('Cliente D', 'cliente_d@example.com', '999888777', -2.0, 3.5),
          ('Cliente E', 'cliente_e@example.com', '156189498', -5, 10),
          ('Cliente F', 'cliente_f@example.com', '489165133', -15.5, -5.8),
          ('Cliente G', 'cliente_g@example.com', '561231321', 14.5, 3.8),
          ('Cliente H', 'cliente_h@example.com', '564113251', 21, 23),
          ('Cliente I', 'cliente_i@example.com', '564164545', -18, -15),
          ('Cliente J', 'cliente_j@example.com', '419816515', 13, -11)
        ;`);

        res.json('OK');
    } catch (error) {
        console.error('Erro ao popular tabela clientes:', error);
        res.status(500).send('Erro ao popular tabela clientes.');
    }
}

// endpoint para deletar tabela 'clients' no banco de dados
export const deleteTableClients = async (req: Request, res: Response) => {
    try {
        await pool.query(`DROP TABLE clients;`);
        res.json('OK');
    } catch (error) {
        console.error('Erro ao criar tabela clientes:', error);
        res.status(500).send('Erro ao criar tabela clientes.');
    }
}


