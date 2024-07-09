from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Define connection details as a dictionary
connection_string = {
    'host': 'localhost',
    'database': 'ibmdata',
    'user': 'root',
    'password': 'nanunani1234'
}

def get_data(role):
    try:
        connection = mysql.connector.connect(**connection_string)
        cursor = connection.cursor()

        # Define column selections based on role
        column_selections = {
            "Manager": "*",
            "Administration Head": (
                "Total_Cost",
                "Employee_Turnover_Rate", "Training_Hours", "Vehicle_Maintenance_Cost"
            ),
            "Delivery Agent": (
                "Delivery_Time",
                "On_Time_Delivery",
                "Fuel_Consumption", "Customer_Complaints",
                "Late_Deliveries"
            ),
            "Marketing Head": (
                "Customer_Satisfaction",
                "On_Time_Delivery",
                "Customer_Complaints"
            )
        }

        if role in column_selections:
            selected_columns = column_selections[role]
            if isinstance(selected_columns, tuple):
                selected_columns = ", ".join(selected_columns)
            query = f"SELECT {selected_columns} FROM fedxdata"
            cursor.execute(query)
            rows = cursor.fetchall()
        else:
            rows = []

        return rows

    except mysql.connector.Error as err:
        print("Error connecting to database or executing query:", err)
        return []

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

@app.route('/get_data', methods=['GET'])
def get_data_endpoint():
    role = request.args.get('role')
    data = get_data(role)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
