pipeline {
    agent any
    tools {
        nodejs 'NodeJS 20' // Ensure this matches the name in Global Tool Configuration
    }
    stages {
        stage('Pull Code') {
            steps {
                git url: 'https://github.com/SakthivelMV/express-app.git', branch: 'main'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install pm2' // Install pm2 locally
                sh 'npm install'
            }
        }
        stage('Restart Application') {
            steps {
                sh './node_modules/.bin/pm2 restart express-app || ./node_modules/.bin/pm2 start server.js --name express-app'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test || true' // Consider removing || true if tests are critical
            }
        }
    }
    post {
        always {
            echo 'Pipeline completed'
        }
    }
}
