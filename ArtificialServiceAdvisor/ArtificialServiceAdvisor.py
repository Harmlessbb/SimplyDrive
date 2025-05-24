import datetime

from sqlite3 import Cursor
import time
from turtle import update

import psycopg2

# Connect to the database
connection = psycopg2.connect(
    user="postgres",           
    password="Liverpool22!",    
    host="192.168.1.213", 
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

    global isHandlingTickets #Flag to make sure we are only handling one ticket at a time


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

        # Set the local variables to the ticket data from the database table

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
    #Self explanatory.
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

    #This function will be important later. Will need access to dealership DMS.

while isRunning:    

#Printing onto screen so we can see what is happening
    print("Refreshing Tickets!")
    refreshTicket()



    #If a ticket is found...
    if isHandlingTickets == True:

        #Set all local variabes to the ones in the ticket
        print("\nSetting Local Variables to Ticket Data!")
        setVariables()
        print("\nVariables Retuned: ", ticketID, userID, dealerID, vehicleID, requestedHours, requestedDate, requestSent,jobType,timeRequested)

        #Check the availability of the requested date from the user against the dealership diary
        print("\nNow Checking Availability!")
        checkAvailability(requestedDate, dealerID)

        #Attempt to update the diary and create the job, if the hours available fall below 5, we will not proceed with booking the job
        print("Now Updating the Diary! and Creating the Job! ")
        if timeRequested == "AM" and hoursAvaialableAM >= 5 or timeRequested == "PM" and hoursAvaialablePM >= 5:
            #Update the diary and create the job
            updateDiary(requestedDate, dealerID, requestedHours, timeRequested)
            createJob(userID, dealerID, vehicleID, requestedDate, timeRequested, jobType, requestedHours)
        else: 
            print("ERROR! - No Hours Available for Requested Time!")

        #Delete the ticket, the user will have to retry if their request failed.
        destroyCurrentTicket()
        
 


