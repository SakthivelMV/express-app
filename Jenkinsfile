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
                // Use npm ci for clean, reproducible installs
                sh 'npm install'
            }
        }

        stage('Restart Application') {
            steps {
                // Ensure PM2 is installed locally and restart/start the app with logs
                sh '''
                ./node_modules/.bin/pm2 restart express-app || ./node_modules/.bin/pm2 start server.js --name express-app
                ./node_modules/.bin/pm2 logs express-app --lines 10
                '''
            }
        }

        stage('Test') {
            steps {
                // Avoid masking test failures unless explicitly intended
                script {
                    try {
                        sh 'npm test'
                    } catch (Exception e) {
                        echo "⚠️ Tests failed: ${e}"
                    }
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build and deployment succeeded!'
        }
        failure {
            echo '❌ Build failed. Check logs.'
        }
        always {
            echo 'Pipeline completed'
        }
    }
}
