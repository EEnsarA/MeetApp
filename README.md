# MeetApp

**A end of term project assignment MeetApp**

### 💻 Created With

#### Frontend & Backend
- **Framework** : [React.js](https://react.dev/)
- **Language** : JavaScript,Html,Css
- **Styling** : [MaterialUI](https://mui.com/material-ui/) 
- **Components** : React Component & Redux & React Router
- **Package Manager** : [npm](https://www.npmjs.com/)
#### API 
- **Application** : [.NET](https://dotnet.microsoft.com/en-us/)
- **Framework** : [EFCore](https://learn.microsoft.com/tr-tr/ef/core/)
- **Language** : C#
- **Database** : MSSQL

### 📁 Project Structure
```
MeetApp/          
├── MeetAppApi/    
│   └── Context/ 
│   └── .gitignore
├── MeetAppWeb/     
│   └── src/
│   └── .gitignore   
├── README.md
└── LICENSE    


```

### 🚀 MeetApp –  Installation & Setup

#### 🔹 Frontend (React + Vite)
1. **Clone the repository (or download the source code):**
    ```bash
    git clone https://github.com/EEnsarA/MeetApp
    cd MeetApp
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up your environment variables:**

    Create a `.env` file in the root of your project:

    ```env
    VITE_API_URL=http://localhost:5134
    ```

    Replace `http://localhost:5134` with the actual address of your **MeetApp API** if different.

4. **Run the development server:**
    ```bash
    npm run dev
    ```

5. **Open your browser:**

    Visit [http://localhost:5173](http://localhost:5173) to view the application.

    > 💡 **Note:** If port 5173 is already in use, Vite will automatically pick another available port (e.g. 5174). Check your terminal output to confirm the correct URL.
    <br>

#### 🔹 Backend (ASP.NET Core API)


1. **Navigate to the API project folder (e.g., MeetAppApi) and open the solution in your IDE.**

2. **Configure environment settings:**

**Open or create the appsettings.Development.json file and update the following values:**
```bash
    {
    "ConnectionStrings": {
        "sql_connection": "Data Source=localhost;Initial Catalog=MeetApp;Integrated Security=True;Encrypt=True;Trust Server Certificate=True;"
    },
    "AppSettings": {
        "secretKey": "your-development-secret-key"
    }
    }
```
**⚠️ Do not share your real connection string or secret key publicly!**

3.  **Run the API project:**

**Use Visual Studio, Rider, or the .NET CLI:**
```bash
    dotnet watch
```
**The API will typically run at  https://localhost:5134, depending on your** **launch settings.**

#### ✅ Final Notes

- Make sure both the API and frontend are running.

- The frontend expects the API to be reachable at the address defined in VITE_API_URL.

- If you face CORS issues, ensure your ASP.NET Core backend is properly configured to allow requests from the frontend origin.


### 📃 License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

