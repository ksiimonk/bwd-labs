const path = require('path');

   module.exports = {
       entry: './src/index.js', // Входная точка вашего приложения
       output: {
           filename: 'bundle.js', // Имя выходного файла
           path: path.resolve(__dirname, 'dist'), // Папка для выходных файлов
       },
       devServer: {
           contentBase: path.join(__dirname, 'dist'), // Папка для обслуживания
           compress: true, // Включение сжатия
           port: 9000, // Порт для сервера
       },
       module: {
           rules: [
               {
                   test: /\.js$/, // Применяем к файлам с расширением .js
                   exclude: /node_modules/, // Исключаем папку node_modules
                   use: {
                       loader: 'babel-loader', // Используем Babel для трансляции JavaScript
                       options: {
                           presets: ['@babel/preset-env']
                       }
                   }
               },
               {
                   test: /\.css$/, // Применяем к CSS-файлам
                   use: ['style-loader', 'css-loader'], // Используем соответствующие лоадеры для обработки CSS
               },
           ],
       },
   };