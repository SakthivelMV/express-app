pipeline {
    agent any
    tools {
        nodejs "NodeJS 20"
    }
    environment {
        NVM_DIR = "/var/lib/jenkins/.nvm"
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
                sh '''
                [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
                pm2 restart express-app || pm2 start server.js --name express-app
                '''
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
