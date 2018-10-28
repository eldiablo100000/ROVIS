from AMSpi import AMSpi
import time
import sys



if __name__ == '__main__':
    # Calling AMSpi() we will use default pin numbering: BCM (use GPIO numbers)
    # if you want to use BOARD numbering do this: "with AMSpi(True) as amspi:"
    with AMSpi() as amspi:
    	try:
		c=sys.argv[1]
		v=int(sys.argv[2])
		go_time=10
		# Set PINs for controlling shift register (GPIO numbering)
		amspi.set_74HC595_pins(21, 20, 16)
		# Set PINs for controlling all 4 motors (GPIO numbering)
		amspi.set_L293D_pins(5, 6, 13, 19)
		if c=="forth":
			print("BACKEND GO: clockwise")
			amspi.run_dc_motors([amspi.DC_Motor_1, amspi.DC_Motor_2, amspi.DC_Motor_3, amspi.DC_Motor_4],speed=v)
			time.sleep(go_time)
		if c=="back":
			print("BACKEND GO: counterclockwise")
			amspi.run_dc_motors([amspi.DC_Motor_1, amspi.DC_Motor_2, amspi.DC_Motor_3, amspi.DC_Motor_4], clockwise=False,speed=v)
			time.sleep(go_time)
		if c=="left":
			print("BACKEND GO: Turn left")
			amspi.run_dc_motors([amspi.DC_Motor_1, amspi.DC_Motor_3], clockwise=False,speed=v)
			amspi.run_dc_motors([amspi.DC_Motor_2, amspi.DC_Motor_4],speed=v)
			time.sleep(go_time)	
		if c=="right":
			print("BACKEND GO: Turn right")
			amspi.run_dc_motors([amspi.DC_Motor_1, amspi.DC_Motor_3],speed=v)
			amspi.run_dc_motors([amspi.DC_Motor_2, amspi.DC_Motor_4], clockwise=False,speed=v)
			time.sleep(go_time)
	except KeyboardInterrupt:
		print("KeyboardInterrupt")
		#dovrebbe andare dentro al try in caso.
        #se si attiva questo if, non funzionano più le cose. SI accellera per qualche secodo e poi ci si ferma
        #if c=="stopGo":
        	#print("Stop")
        	#amspi.stop_dc_motors([amspi.DC_Motor_1, amspi.DC_Motor_2, amspi.DC_Motor_3, amspi.DC_Motor_4])
        	#time.sleep(5)
	
        
            
            





