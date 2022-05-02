FROM ros:melodic

# install ros package
RUN apt-get update && apt-get install -y \
    ros-${ROS_DISTRO}-navigation \
    ros-${ROS_DISTRO}-gazebo-ros-control \
    ros-${ROS_DISTRO}-joy \
    ros-${ROS_DISTRO}-teleop-twist-joy \ 
    ros-${ROS_DISTRO}-teleop-twist-keyboard \
    ros-${ROS_DISTRO}-laser-proc \
    ros-${ROS_DISTRO}-rgbd-launch \ 
    ros-${ROS_DISTRO}-depthimage-to-laserscan \
    ros-${ROS_DISTRO}-rosserial-arduino \
    ros-${ROS_DISTRO}-rosserial-python \
    ros-${ROS_DISTRO}-rosserial-server \ 
    ros-${ROS_DISTRO}-rosserial-client \
    ros-${ROS_DISTRO}-rosserial-msgs \ 
    ros-${ROS_DISTRO}-amcl \ 
    ros-${ROS_DISTRO}-map-server \
    ros-${ROS_DISTRO}-move-base \ 
    ros-${ROS_DISTRO}-urdf \
    ros-${ROS_DISTRO}-xacro \
    ros-${ROS_DISTRO}-compressed-image-transport \ 
    ros-${ROS_DISTRO}-rqt* \
    ros-${ROS_DISTRO}-gmapping \  
    ros-${ROS_DISTRO}-interactive-markers \
    ros-${ROS_DISTRO}-dynamixel-sdk \
    ros-${ROS_DISTRO}-turtlebot3-msgs \
    ros-${ROS_DISTRO}-turtlebot3

RUN apt-get update && apt-get install python3-catkin-tools -y
   
RUN mkdir -p ~/catkin_ws/src \
 && cd ~/catkin_ws/src/ \ 
 && git clone -b melodic-devel https://github.com/ROBOTIS-GIT/DynamixelSDK.git \
 && git clone -b melodic-devel https://github.com/ROBOTIS-GIT/turtlebot3_msgs.git \
 && git clone -b melodic-devel https://github.com/ROBOTIS-GIT/turtlebot3.git \
 && git clone -b kinetic-devel https://github.com/ROBOTIS-GIT/turtlebot3_simulations.git

       
RUN . /opt/ros/$ROS_DISTRO/setup.sh && \ 
    cd ~/catkin_ws && catkin build && \
    echo "source ~/catkin_ws/devel/setup.bash" >> ~/.bashrc && \ 
    /bin/bash -c "source /root/catkin_ws/devel/setup.bash"  
RUN export TURTLEBOT3_MODEL=burger
      # launch ros package
#CMD ["ros2", "launch", "demo_nodes_cpp", "talker_listener.launch.py"]
#CMD [ "roslaunch"," turtlebot3_gazebo","turtlebot3_empty_world.launch" ] 
#CMD ["roslaunch","turtlebot3_fake","turtlebot3_fake.launch"]

