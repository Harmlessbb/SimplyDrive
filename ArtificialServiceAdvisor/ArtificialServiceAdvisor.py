import datetime

from sqlite3 import Cursor
import time
from turtle import update

import psycopg2

# Connect to the database
connection = psycopg2.connect(
    user="postgres",           
    password="Liverpool22!",    
    host="86.133.77.238", 
    port="5432"                    
)

# Flag Variables

isRunning = True
debugCounter = 0
isHandlingTickets = False

# Variables

global ticketID, userID, dealerID, requestedHours, requestedDate, requestSent, timeRequested, hoursAvaialablePM, hoursAvaialableAM

ticketID = int 
userID = int
dealerID = int
vehicleID = int
jobType = str
requestedHours = int
requestedDate = datetime.date
requestSent = datetime.date
timeRequested = str

hoursAvaialablePM = float
hoursAvaialableAM = float


def refreshTicket ():

    global isHandlingTickets


    cursor = connection.cursor()
    cursor.execute("SELECT * FROM ticketTracker")
    ticketRefreshReturn = cursor.fetchall()

    if not ticketRefreshReturn:
        isHandlingTickets = False
        print("- All Tickets Complete!")

    else:
        isHandlingTickets = True
        print("- Ticket Found!")

    cursor.close()    

def setVariables():
        
        global ticketID, userID, dealerID, requestedHours, requestedDate, requestSent, timeRequested, hoursAvaialablePM, hoursAvaialableAM, vehicleID, jobType

        cursor = connection.cursor()
        cursor.execute("SELECT * FROM ticketTracker")
        ticketRefreshReturn = cursor.fetchall()


        ticketID = ticketRefreshReturn[0][0]
        userID = ticketRefreshReturn[0][1]
        dealerID = ticketRefreshReturn[0][2]
        vehicleID = ticketRefreshReturn[0][3]
        jobType = ticketRefreshReturn[0][4]
        requestedHours = ticketRefreshReturn[0][5]
        requestedDate = ticketRefreshReturn[0][6]
        requestSent = ticketRefreshReturn[0][7]
        timeRequested = ticketRefreshReturn[0][8]

def checkAvailability(requestedDate, dealerID):

    cursor = connection.cursor()
    selectLine = "SELECT * FROM dealershipDiaryDB WHERE date = %s AND dealerID = %s"

    sqlDate = requestedDate.strftime('%Y-%m-%d')
    cursor.execute(selectLine, (sqlDate, dealerID))

    diaryReturn = cursor.fetchall()
    
    global hoursAvaialablePM, hoursAvaialableAM

    hoursAvaialablePM = diaryReturn[0][3]
    hoursAvaialableAM = diaryReturn[0][2]

def updateDiary(requestedDate, dealerID, requestedHours, timeRequested):

    cursor = connection.cursor()
    selectLine = ("SELECT * FROM dealershipDiaryDB WHERE date = %s AND dealerID = %s")
    
    cursor.execute(selectLine, (requestedDate, dealerID))
    ticketRefreshReturn = cursor.fetchall()


    hoursAvaialablePM = ticketRefreshReturn[0][3]
    hoursAvaialableAM = ticketRefreshReturn[0][2]

    if timeRequested == "AM":
        newHoursAvailable = hoursAvaialableAM - requestedHours
        updateLine = ("UPDATE dealershipDiaryDB SET hoursavailableam = %s WHERE date = %s AND dealerID = %s")
        cursor.execute(updateLine, (newHoursAvailable, requestedDate, dealerID))

def destroyCurrentTicket():

    cursor = connection.cursor()
    deleteLine = "DELETE FROM ticketTracker WHERE ticketID = %s"
    cursor.execute(deleteLine, (ticketID,))
    connection.commit()
    cursor.close() 

def createJob(userID, dealerID, vehicleID, requestedDate, timeRequested, jobType, requestedHours):

    Cursor = connection.cursor()
    insertLine = "INSERT INTO bookingTrackerDB (UserID, DealerID, VehicleID, BookingDate, jobtime, BookingType, EstimatedTime) VALUES (%s,%s,%s,%s,%s,%s,%s)"

    Cursor.execute(insertLine, (userID, dealerID, vehicleID, requestedDate, timeRequested, jobType, requestedHours))
    connection.commit()
    print("Attempted To Insert: ", userID, dealerID, vehicleID, requestedDate, timeRequested, jobType, requestedHours)

while isRunning:    

    print("Refreshing Tickets!")
    refreshTicket()



    
    if isHandlingTickets == True:

        print("\nSetting Local Variables to Ticket Data!")
        setVariables()
        print("\nVariables Retuned: ", ticketID, userID, dealerID, vehicleID, requestedHours, requestedDate, requestSent,jobType,timeRequested)

        print("\nNow Checking Availability!")
        checkAvailability(requestedDate, dealerID)

        print("Now Updating the Diary! and Creating the Job! ")
        if timeRequested == "AM" and hoursAvaialableAM >= 5 or timeRequested == "PM" and hoursAvaialablePM >= 5:
            updateDiary(requestedDate, dealerID, requestedHours, timeRequested)
            createJob(userID, dealerID, vehicleID, requestedDate, timeRequested, jobType, requestedHours)
        else: 
            print("ERROR! - No Hours Available for Requested Time!")

        destroyCurrentTicket()
        
 


