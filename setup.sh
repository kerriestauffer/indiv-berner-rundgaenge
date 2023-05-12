#!/bin/sh

# this script installs dependencies for frontend and backend

if
    ! command -v npm >/dev/null 2>&1
then
    echo "node/npm not installed"
    echo "visit https://nodejs.org/en"
    exit 1
fi

npm install --prefix ./frontend && echo "frontend dependencies installed"
npm install --prefix ./backend && echo "backend dependencies installed"
