const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
require("dotenv").config()

const port = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json())

// Debug function to safely register routes
function safeRegisterRoute(routePath, routeFile) {
  try {
    console.log(`🔍 Attempting to register: ${routePath}`)
    const routeHandler = require(routeFile)
    app.use(routePath, routeHandler)
    console.log(`✅ Successfully registered: ${routePath}`)
    return true
  } catch (error) {
    console.error(`❌ Failed to register ${routePath}:`, error.message)
    console.error(`Stack trace:`, error.stack)
    return false
  }
}

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("✅ MongoDB connected")

    // Register routes one by one to identify the problematic one
    console.log("\n🚀 Registering API routes...")

    const routes = [
      { path: "/user-api", file: "./APIs/userApi" },
      { path: "/author-api", file: "./APIs/authorApi" },
      { path: "/admin-api", file: "./APIs/adminApi" },
    ]

    let allRoutesRegistered = true

    for (const route of routes) {
      const success = safeRegisterRoute(route.path, route.file)
      if (!success) {
        allRoutesRegistered = false
        console.log(`⚠️  Skipping ${route.path} due to error`)
      }
    }

    if (!allRoutesRegistered) {
      console.log("\n⚠️  Some routes failed to register. Server will continue without them.")
    }

    // Serve frontend build files
    const frontendPath = path.join(__dirname, "../client/dist")
    app.use(express.static(frontendPath))

    // SPA Fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(frontendPath, "index.html"))
    })

    // Start server
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`)
    })
  })
  .catch((err) => {
    console.error("❌ Error in database connection:", err)
  })

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error:", err.message)
  res.status(500).send({ message: err.message })
})
