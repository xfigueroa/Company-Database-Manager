# Company-Database-Manager

Company-Database-Manager is a command-line interface (CLI) application for managing a company's database. It allows you to perform CRUD operations on departments, roles, and employees.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/xfigueroa/company-database-manager.git
    cd company-database-manager
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Set up the database:

    - Create a `.env` file in the root directory and add your database credentials:

        ```env
        DB_USER=your_db_user
        DB_PASSWORD=your_db_password
        DB_NAME=company_db
        ```

    - Run the schema script to create the database and tables:

        ```sh
        psql -U your_db_user -f src/db/schema.sql
        ```

4. Build the project:

    ```sh
    npm run build
    ```

## Usage

1. Start the application:

    ```sh
    npm start
    ```

2. Follow the prompts to manage the company's database.

## License

This project is licensed under the MIT License - see the [`LICENSE`](LICENSE ) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Tests

Link to video: https://drive.google.com/file/d/1yxkB37McZiQ8DjhbCmibSpa-VoIEyMtX/view?usp=sharing

## Questions
If you have any questions, you can reach me at [xfigueroa28@gmail.com](mailto:xfigueroa28@gmail.com).
You can also find me on GitHub at [xfigueroa](https://github.com/xfigueroa).