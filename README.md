# AI Grammar Enhancer
This project uses `deep-learning-analytics/GrammarCorrector` a pretrained model, to detect and rewrite gramatical and punctuation errors.
# Wanna deploy locally?
## Using Docker
### Installing Docker (for Windows)
Install Docker Desktop form https://www.docker.com/products/docker-desktop/
### Clone & Setup
```bash
git clone https://github.com/ReddyKousic/AI-Writing-Assistant.git
cd AI-Writing-Assistant
cd backend
python GEC_file.py
```
### Starting the Docker containers
The following command runs Docker containers in the background (`-d` for detach). You can interact with the containers in Docker Desktop or in Command Line if you are comfortable with it.
> [!IMPORTANT]  
> This will take some time for the first time.
```bash
 docker-compose up -d
```
