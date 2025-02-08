<!-- Read Me HEre -->
<!-- Bitebox Food Ordering Website -->

Backend and database setup

    Install Python
        Ensure you have Python installed (>= 3.8). If not, download and install it from Python's official site https://www.python.org/ftp/python/3.13.2/python-3.13.2-amd64.exe

    Set up a virtual environment:
        cd backend
        python -m venv venv
        source venv/bin/activate  # Mac/Linux
        venv\Scripts\activate    # Windows
    
    Install Required Packages
        Inside the virtual environment, install dependencies:
        pip install -r requirements.txt

    Install PostgreSQL Database
        Download and install PostgreSQL from PostgreSQL's official site https://sbp.enterprisedb.com/getfile.jsp?fileid=1259337
        During the setup in select components step check all the boxes
        In setup password phase enter password and remeber it because it will be used later to interact with postgresql. 
        Creating the Database via Terminal
        Open the PostgreSQL terminal (psql):
            psql -U postgres

        Create the database and user:
            CREATE DATABASE Bitebox;
            CREATE USER Bitebox WITH PASSWORD 'Bitebox';
            ALTER ROLE Bitebox SET client_encoding TO 'utf8';
            ALTER ROLE Bitebox SET default_transaction_isolation TO 'read committed';
            ALTER ROLE Bitebox SET timezone TO 'UTC';
            GRANT ALL PRIVILEGES ON DATABASE Bitebox TO Bitebox;
        
        Creating the Database via pgAdmin 4:
            Install the pgadmin from the https://ftp.postgresql.org/pub/pgadmin/pgadmin4/v9.0/windows/pgadmin4-9.0-x64.exe
            Open pgAdmin 4 and connect to your PostgreSQL server.
            Right-click on Databases → Click Create → Database.
            Enter Bitebox as the database name.
            Go to the Owner field and select Bitebox.
            Click Save.
            Navigate to Login/Group Roles → Right-click Create → Login/Group Role.
            Enter Bitebox as the role name and set the password to Bitebox.
            Under the Privileges tab, grant all permissions.
            Click Save.


    Apply Migrations and Create Superuser
        Run migrations:
            python manage.py makemigrations
            python manage.py migrate

    Run the Django Server
        python manage.py runserver


Frontend Setup (React)

    Install Node.js
        Ensure you have Node.js (>= 14.x) installed. Download from Node.js official site https://nodejs.org/dist/v22.13.1/node-v22.13.1-x64.msi

    Install React and Dependencies
        Navigate to the frontend/ folder and install dependencies:
            cd frontend
            npm install
    
    Run the React App
        Start the development server:
            npm start


    