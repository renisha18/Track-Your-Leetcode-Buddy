import express from 'express'
import pool from '../db.js'

const router = express.Router()

router.post('/login', async (req, res) => {
  const { leetcode_username } = req.body

  if (!leetcode_username) {
    return res.status(400).json({ error: 'Username is required' })
  }

  try {
    // Step A: validate the username actually exists on LeetCode
    const leetcodeRes = await fetch(
      `https://alfa-leetcode-api.onrender.com/${leetcode_username}`
    )

    if (!leetcodeRes.ok) {
      return res.status(404).json({ error: 'Username not found on LeetCode' })
    }

    const leetcodeData = await leetcodeRes.json()

    // Step B: check if this user already exists in our DB
    const existing = await pool.query(
      'SELECT * FROM users WHERE leetcode_username = $1',
      [leetcode_username]
    )

    let user
    if (existing.rows.length > 0) {
      user = existing.rows[0]
    } else {
      // Step C: create the user if they're new
      const inserted = await pool.query(
        'INSERT INTO users (leetcode_username) VALUES ($1) RETURNING *',
        [leetcode_username]
      )
      user = inserted.rows[0]
    }

    res.json({ user })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

export default router