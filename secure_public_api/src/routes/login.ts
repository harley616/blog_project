import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Secret } from 'jsonwebtoken'

const router = express.Router()

router.post('/', async (req, res) => {
	const { username, password } = req.body

	// Fetch the hashed password from environment variables or database
	const storedUsername = process.env.USER_NAME
	const storedPassword = process.env.PASSWORD

	if (username === storedUsername) {
		const isPasswordValid = await bcrypt.compare(
			storedPassword as string,
			password,
		)
		if (isPasswordValid) {
			const token = jwt.sign(
				{ username },
				process.env.JWT_SECRET as Secret,
				{
					expiresIn: '1h',
				},
			)
			return res.json({ token })
		}
	}

	res.sendStatus(400)
})

export { router }
