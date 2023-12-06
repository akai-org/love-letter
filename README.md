# love-letter
A card game written in FastAPI and React

## Setup

Make sure you have Docker and Docker Compose installed.

Then type command
```bash
docker-compose build
```

## Run project

To run the project, type
```bash
docker-compose up
```

## Run tests on backend

Make sure you have installed PyTest.

To run tests on the backend, being on `project root directory`, type
```bash
python3 -m pytest
```

To run coverage tests, after installing `coverage` package and being on
`project root directory`, type
```bash
coverage run -m pytest
```

Ports:
- frontend: 3000
- backend: 8000