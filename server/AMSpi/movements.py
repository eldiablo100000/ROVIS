#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
   Servo Example - Example of usage ASMpi class

.. Licence MIT
.. codeauthor:: Jan Lipovský <janlipovsky@gmail.com>, janlipovsky.cz
"""

from AMSpi import AMSpi
import time
import sys



if __name__ == '__main__':
    # Calling AMSpi() we will use default pin numbering: BCM (use GPIO numbers)
    # if you want to use BOARD numbering do this: "with AMSpi(True) as amspi:"
    with AMSpi() as amspi:
    	try:
		c=sys.argv[1]
		go_time=10
		# Set PINs for controlling shift register (GPIO numbering)
		amspi.set_74HC595_pins(21, 20, 16)
		# Set PINs for controlling all 4 motors (GPIO numbering)
		amspi.set_L293D_pins(5, 6, 13, 19)
		if c=="go":
			print("GO: clockwise")
			amspi.run_dc_motors([amspi.DC_Motor_1, amspi.DC_Motor_2, amspi.DC_Motor_3, amspi.DC_Motor_4])
			time.sleep(go_time)
		if c=="goBack":
			print("GO: counterclockwise")
			amspi.run_dc_motors([amspi.DC_Motor_1, amspi.DC_Motor_2, amspi.DC_Motor_3, amspi.DC_Motor_4], clockwise=False)
			time.sleep(go_time)
		if c=="goLeft":
			print("Turn left")
        	amspi.run_dc_motors([amspi.DC_Motor_1, amspi.DC_Motor_3], clockwise=False)
        	amspi.run_dc_motors([amspi.DC_Motor_2, amspi.DC_Motor_4])
        	time.sleep(go_time)	
        if c=="goRight":
			print("Turn right")
        	amspi.run_dc_motors([amspi.DC_Motor_1, amspi.DC_Motor_3])
        	amspi.run_dc_motors([amspi.DC_Motor_2, amspi.DC_Motor_4], clockwise=False)
        	time.sleep(go_time)
	except KeyboardInterrupt:
		print("ERRORE KEYBOARD")
		#dovrebbe andare dentro al try in caso.
        #se si attiva questo if, non funzionano più le cose. SI accellera per qualche secodo e poi ci si ferma
        #if c=="stopGo":
        	#print("Stop")
        	#amspi.stop_dc_motors([amspi.DC_Motor_1, amspi.DC_Motor_2, amspi.DC_Motor_3, amspi.DC_Motor_4])
        	#time.sleep(5)
	
        
            
            





