#!/bin/bash
docker run -p 5432:5432 --rm --name vlcs-tech-hiring -e POSTGRES_PASSWORD=vlcs-tech-hiring postgres
