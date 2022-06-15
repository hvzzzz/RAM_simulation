FROM ros:melodic

# install ros package
RUN apt-get update && apt-get install -y \
      ros-${ROS_DISTRO}-turtlebot3 \
      ros-${ROS_DISTRO}-turtlebot3-gazebo \
      ros-${ROS_DISTRO}-turtlebot3-msgs \
      ros-${ROS_DISTRO}-turtlebot3-navigation \
      ros-${ROS_DISTRO}-turtlebot3-slam \
      ros-${ROS_DISTRO}-turtlebot3-teleop \
      ros-${ROS_DISTRO}-rosbridge-server \
      ros-${ROS_DISTRO}-rviz 
# install utils
RUN apt-get update && apt-get install  -y \
    python3-catkin-tools \
    tmux  \
    vim \
    git
# workspace setup   
RUN mkdir -p ~/catkin_ws/src \
    && cd ~/catkin_ws/src/ \ 
    && catkin_create_pkg gui_bridge rosbridge_server \
    && git clone https://github.com/yzrobot/pose_publisher.git 
COPY gui.launch /tmp/ 

RUN cd ~/catkin_ws/src/gui_bridge/ && mkdir -p launch \
    && mv -b /tmp/gui.launch ~/catkin_ws/src/gui_bridge/launch/

RUN . /opt/ros/$ROS_DISTRO/setup.sh \
    && cd ~/catkin_ws \
    && catkin b \
    && echo "source ~/catkin_ws/devel/setup.bash" >> ~/.bashrc \ 
    && /bin/bash -c "source /root/catkin_ws/devel/setup.bash" \
    && echo "export TURTLEBOT3_MODEL=burger" >> ~/.bashrc

RUN  echo "tmux" >> ~/.bashrc
# launch ros package
#CMD ["ros2", "launch", "demo_nodes_cpp", "talker_listener.launch.py"]
