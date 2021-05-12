# BruteNode

I built this tool in order to overcome the lack of an online password cracker working with JSON as ajax call body, the ones I know only works with forms.
This tool was built specifically for a penetration testing I was making as the login page of my target doesn't provide any mechanism to prevent bruteforce attacks.
I highly recomment to implement some kind of prevention in your application like captcha or rate limiter, for more information refer to owasp cheatsheet.

The tool need a little configuration to run. You will need the folowing things:
1) The post request the login page makes  
2) A password list 
3) A username list  

To fullfill requirement number 1 follow this instruction: First open chrome dev tools on the network tab, then make the login with random credentials. At this point new post request just copy that request by making right click copy as Node Js fetch, then paste it in the code
( there is this comment  //insert the request copied from chrome as explained in README on my code, so you can't fail) and then substituite your username and your password with ${utenti[i]} and ${passwd}. Most of the time this will be enough.

Just a couple of consideration before continuing. First this approch of manual substituition is not automated because every site use custome request. Second, as this software is 
made for authentication with JSON web tokens it checks if the token in the response is null to know if the authentication is successful but be careful that sometimes the name of the token 
could be different from token (in this case just change it from the code at // change this condition if needed)

Now you are almost ready to rock, just do the following step:
1) npm install 
2) node index
3) on http://127.0.0.1:5000/ form insert the list of usernames and password and click start

