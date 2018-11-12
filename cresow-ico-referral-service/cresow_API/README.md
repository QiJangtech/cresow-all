# Cresow Rails API Deployment on ubuntu 16.04 LTS

## [Cresow REST API Documentation](https://documenter.getpostman.com/view/5666490/RzZ9HKib)

## required Package

1. Ruby Version Manager (RVM)
2. Ruby 2.5.1
3. Nginx
3. Passenger Open Source
4. MySQL Server


## Installing Ruby with RVM

1. Prepare the system
```
sudo apt-get update
sudo apt-get install -y curl gnupg build-essential
```

2. Install RVM
```
sudo gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
curl -sSL https://get.rvm.io | sudo bash -s stable
sudo usermod -a -G rvm `whoami`
source ~/.rvm/scripts/rvm
```
 * You may need to use gpg2 instead of gpg on some systems.
 * On systems where sudo is configured with secure_path, the shell environment needs to be modified to set rvmsudo_secure_path=1. secure_path is set on most Linux systems, but not on macOS. The following command tries to autodetect whether it is necessary to install rvmsudo_secure_path=1, and only installs the environment variable if it is the code.

 ```
 if sudo grep -q secure_path /etc/sudoers; then sudo sh -c "echo export rvmsudo_secure_path=1 >> /etc/profile.d/rvm_secure_path.sh" && echo Environment variable installed; fi
 ```
 * When you are done with all this, relogin to your server to activate RVM
 
3. Install Ruby
```
rvm install ruby-2.5.1
rvm use ruby-2.5.1 --default
```
4. Install Bundler
```
gem install bundler --no-rdoc --no-ri
```
5. Install Node.js
 * Rails's asset pipeline compiler requires a Javascript runtime. 
 * Node.js version does not matter.
```
sudo apt-get install -y nodejs &&
sudo ln -sf /usr/bin/nodejs /usr/local/bin/node
```


## Installing Passenger + Nginx


1. Install Passenger packages
 * These commands will install Passenger + Nginx through Phusion's APT repository
 * If you already had Nginx installed, then these commands will upgrade Nginx to Phusion's version (with Passenger compiled in).
 * Install PGP Key& add HTTPS Support for APT
 ```
 sudo apt-get install -y dirmngr gnupg
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 561F9B9CAC40B2F7
sudo apt-get install -y apt-transport-https ca-certificates
 ```
 * Add APT repository
 ```
 sudo sh -c 'echo deb https://oss-binaries.phusionpassenger.com/apt/passenger xenial main > /etc/apt/sources.list.d/passenger.list'
sudo apt-get update
 ```
 * Install Passenger + Nginx
 ```
 sudo sh -c 'echo deb https://oss-binaries.phusionpassenger.com/apt/passenger xenial main > /etc/apt/sources.list.d/passenger.list'
sudo apt-get update
 ```
2. Edit /etc/nginx/nginx.conf and uncomment include /etc/nginx/passenger.conf;

 * Eg, you see like this:
 ```
 # include /etc/nginx/passenger.conf;
 ```
 * Remove the '#' characters:
 ```
include /etc/nginx/passenger.conf;
 ```
 * When you are finished, restart nginx service:
 ```
sudo service nginx restart
 ```
3. check installation
```
sudo /usr/bin/passenger-config validate-install
```


## Setting Up MySQL


1. Install MySQL server and client from the packages in the Ubuntu repository
```
sudo apt-get install mysql-server mysql-client libmysqlclient-dev
```
 * Installing the libmysqlclient-dev gives you the necessary files to compile the mysql2 gem which is what Rails will use to connect to MySQL when you setup your Rails app.
 * Setup the root password
 ```
 mysql_secure_installation
 ```
 
 
## Deploying a Ruby app


1. Pull code
 * Pull/clone your code from git repository in nginx html folder
 ```
sudo apt install acl
sudo setfacl -m u:`whoami`:rwx /usr/share/nginx/html
cd /usr/share/nginx/html
git clone -b develop https://github.com/QiJangtech/cresow-ico-referral-service CRS
cd /usr/share/nginx/html/CRS/cresow_API/
git pull origin develop
 ```
2. Configure database.yml and secrets.yml
 * Since your Rails app probably needs a database, you need to edit config/database.yml.
 * Look for the default & production section, change the
 ```
 username: 
 password: 
 host: localhost
 database:
 ```
 * Rails also needs a unique secret key with which to encrypt its sessions. Starting from Rails 4, this secret key is stored in config/secrets.yml. But first, we need to generate a secret key. Run:
 ```
 bundle exec rake secret
 ```
 * If secrets.yml already exists just open the file & edit:
 ```
 production:
  	 secret_key_base: <%=ENV["SECRET_KEY_BASE"]%>
 ```
 * Then replace it with the following. If the file didn't already exist, simply insert the following.
 ```
 production:
  	 secret_key_base: the value that you copied from 'rake secret'
 ```
 * To prevent other users on the system from reading sensitive information belonging to your app, let's tighten the security on the configuration directory and the database directory:
 ```
chmod 700 config db
chmod 600 config/database.yml config/secrets.yml
 ```
3. Initialize application
 * look for file db/seeds.rb
 * uncomment or remove the first character '#' from line 30 till 68
 * create new file .env, put these environment variable inside:
 ```
COINSPAYMENT_IPN_SECRET=
CRESOW_ADMIN_EMAIL=admin@cresow.com
 ```
 * go to file config/initializers/coinpayments.rb, update:
 ```
 config.merchant_id     = ''
 config.public_api_key  = ''
 config.private_api_key = ''
 ```
 * put valid value in each file, invalid value will cause the application to work unexpectedly
 * install necessary gems, create DB & do DB migrations
 ```
 bundle install --no-deployment
 rake db:create
 rake db:migrate
 rake db:seed
 ```
 * After migration finished, comment or add the character '#' at first from line 30 till 68. This is necessary to avoid data duplications during production asset compilation
 * Compile rails assets for production environment
 ```
 bundle exec rake assets:precompile db:migrate RAILS_ENV=production
 ```
4. Determine the Ruby command that Passenger should use
```
passenger-config about ruby-command
```
 * Please take note of the text after "To use in Nginx". You will need it in one of the next steps.
 * Edit Nginx configuration file
 ```
 /etc/nginx/sites-enabled/myapp.conf
 ```
 * Replace myapp with your app's name
 * Put this inside the file:
 
  ```
 passenger_max_instances_per_app 5;
 passenger_max_pool_size 5;
 passenger_pre_start yourserver.com;

 server {
    listen 80;
    server_name yourserver.com;

    # Tell Nginx and Passenger where your app's 'public' directory is
    root /usr/share/nginx/html/CRS/cresow_API/public;

    # Turn on Passenger
    passenger_min_instances 2;
    passenger_enabled on;
    passenger_friendly_error_pages on;
    passenger_ruby /path-to-ruby;
 }
  ```
  * Replace yourserver.com with your server's host name, and replace /usr/share/nginx/html/CRS/cresow_API with your application's code directory path if necessary. However, make sure that Nginx is configured to point to the public subdirectory inside it!
  * Replace /path-to-ruby with the Ruby command that you obtained in step 4.1
  * When you are done, restart Nginx:
   ```
   sudo service nginx restart
   ```
   
   
## Deploying application updates


1. Pull latest code from Git
```
cd /usr/share/nginx/html/CRS/cresow_API/
git pull origin develop
```
2. Prepare application
 * Switch to the appropriate Ruby interpreter
  ```
  rvm use ruby-2.5.1 --default
  ```
 * Install app dependencies
  ```
  bundle install --deployment --without development test
  ```
 * Compile Rails assets and run database migrations
  ```
  bundle exec rake assets:precompile db:migrate RAILS_ENV=production
  ```
 * Restart application
  ```
  sudo service nginx restart
  ```