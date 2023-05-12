#!/bin/sh

# this script starts the development stack
# stop it by pressing ctrl+c

#trap cleanup EXIT
trap cleanup INT

cleanup() {
    echo ""
    if sudo docker rm --force "$DB_CONTAINER" >/dev/null; then
        suc "Cleaned db container!"
    else
        fail "Could not clean container! Do it manually!"
    fi
}

fail() {
    echo "❌ " "$@"
}

suc() {
    echo "✔️ " "$@"
}

warn() {
    echo "⚠️ " "$@"
}

info() {
    echo "❕ " "$@"
}

# Check if ran as root
if [ "$(id -u)" -eq 0 ]; then
    # silent for now
    fail "Do not execute as root!"
    exit 1
fi

# Check if running inside container
#if grep 'kthreadd' /proc/2/status 2>/dev/null; then
#    fail "This should not be ran from inside of a container!"
#    exit 1
#fi

# Check if docker is installed
if sudo docker --version >/dev/null; then
    suc "Docker installed"
else
    fail "Please install docker..."
    exit 1
fi

# Check if in WSL
if sudo grep -q microsoft /proc/version; then
    info "Running in WSL"

    # Check if docker service running
    if sudo service docker status >/dev/null; then
        suc "Docker service already running"
    else
        sudo service docker start >/dev/null && suc "Docker service started"
        sleep 2s
    fi
else
    info "Not running in WSL"
    warn "Make sure that the docker service is running!"
fi

# Start postgres container
DB_CONTAINER=$(sudo docker run --rm -p 127.0.0.1:27017:27017 -d mongo:6.0.5) && suc "Mongo started! $DB_CONTAINER" || exit 1

# Create db schema
#npx prisma db push

# Start nest
nest "$@"
