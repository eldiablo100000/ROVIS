#!/usr/bin/python
import RPi.GPIO as GPIO
import time
import sys
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

TRIGFront = 17 
ECHOFront = 18
TRIGBack = 5
ECHOBack = 6
TRIGLeft = 13
ECHOLeft = 19
TRIGRight = 22
ECHORight = 23
def mesure(sensor):
    #print "Sensor "+sensor
    #print "Distance Measurement In Progress"
    if(sensor=="FRONT"):
        trigger=TRIGFront
        echo=ECHOFront
    elif(sensor=="RIGHT"):
        trigger=TRIGRight
        echo=ECHORight
    elif(sensor=="BACK"):
        trigger=TRIGBack
        echo=ECHOBack
    elif(sensor=="LEFT"):
        trigger=TRIGLeft
        echo=ECHOLeft
    GPIO.setup(trigger,GPIO.OUT)
    GPIO.setup(echo,GPIO.IN)

    GPIO.output(trigger, False)
    #print "Waiting For Sensor To Settle"
    time.sleep(2)

    GPIO.output(trigger, True)
    time.sleep(0.00001)
    GPIO.output(trigger, False)

    while GPIO.input(echo)==0:
        pulse_start = time.time()

    while GPIO.input(echo)==1:
        pulse_end = time.time()

    pulse_duration = pulse_end - pulse_start

    distance = pulse_duration * 17150

    distance = round(distance, 2)

    #print "Distance:",distance,"cm"
    return distance

GPIO.cleanup()
sensors = ["FRONT","RIGHT","BACK","LEFT"]
if(len(sys.argv)==1):
    for el in sensors:
        distance=mesure(el)
        #print "sys"
else:
    for el in sensors:
        if(sys.argv[1]==el):
            #print sys.argv[1]
            distance=mesure(el)
            print distance
            break
    else:
        print "error"
        print "usage: range_sensors.py <sensor> "
        print "<sensor>: "
        for el in sensors:
            print "\t" + el 


