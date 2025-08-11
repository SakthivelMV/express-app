pipeline {
    agent any
    tools {
        nodejs "NodeJS 20"
    }
    stages {
        stage('Pull Code') {
            steps {
                git url: 'https://github.com/SakthivelMV/express-app.git', branch: 'main'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Restart Application') {
            steps {
                sh 'pm2 restart express-frontend || pm2 start server.js --name express-frontend'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test || true'
            }
        }
    }
    post {
        always {
            echo 'Pipeline completed'
        }
    }
}
