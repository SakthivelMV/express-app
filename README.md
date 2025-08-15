# 🚀 CI/CD Deployment Assignment: Flask + Express on EC2 with Jenkins

## 📌 Overview

This project demonstrates how to deploy a Flask backend and an Express frontend on a single Amazon EC2 instance, with a CI/CD pipeline implemented using Jenkins to automate deployments. Both applications are managed using PM2 for process reliability and restart resilience.

### ✅ EC2 Provisioning

- Launch an Ubuntu 22.04 EC2 instance (free-tier eligible).
- Open ports `3000`, `5000`, and `8080` in the security group.
- SSH into the instance:

```bash
ssh -i your-key.pem ubuntu@<EC2-PUBLIC-IP>


**Install Modules and Dependencies:
npm install
sudo npm install -g pm2
pm2 start app.js --name express-app
pm2 save


Clone Repositories:
git clone https://github.com/your-username/express-app.git

Install Jenkins:
sudo apt update
sudo apt install -y openjdk-11-jdk
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo tee /etc/apt/trusted.gpg.d/jenkins.asc
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update
sudo apt install -y jenkins
sudo systemctl start jenkins



Jenkins:http://<EC2-IP>:8080
Install Jenkins Plugins
- Git
- NodeJS
- Python
- Pipeline

Configure GitHub Webhooks
- Go to GitHub repo → Settings → Webhooks
- Add: http://<EC2-IP>:8080/github-webhook/
- Trigger on push events

Verify Everything
- Push code to GitHub → Jenkins should auto-trigger
- Check Jenkins logs for build success
- Run pm2 list to confirm apps are running



- 






