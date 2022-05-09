FROM ros:melodic

# install ros package
RUN apt-get update && apt-get install -y \ 
    ros-${ROS_DISTRO}-husky-navigation \ 
    ros-${ROS_DISTRO}-husky-gazebo \
    ros-${ROS_DISTRO}-husky-viz \
    ros-${ROS_DISTRO}-roslint

# install utils
RUN apt-get update && apt-get install  -y \
    python3-catkin-tools \
    tmux  \
    vim 
# workspace setup   
RUN mkdir -p ~/catkin_ws/src \
    && cd ~/catkin_ws/src/ \ 
    && git clone -b ${ROS_DISTRO}-devel https://github.com/husky/husky.git  
# building workspace and sourcing files       
RUN . /opt/ros/$ROS_DISTRO/setup.sh && \ 
    cd ~/catkin_ws && catkin b && \
    echo "source ~/catkin_ws/devel/setup.bash" >> ~/.bashrc && \ 
    /bin/bash -c "source /root/catkin_ws/devel/setup.bash"  && \
    echo "export HUSKY_GAZEBO_DESCRIPTION=$(rospack find husky_gazebo)/urdf/description.gazebo.xacro" >> ~/.bashrc

RUN  echo "tmux" >> ~/.bashrc
