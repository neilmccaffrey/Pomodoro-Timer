import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import { render } from 'react-dom';





class Timer extends React.Component{
constructor(){
    super()
    this.state = {
        workMinutes: 1,
        workSeconds: 0, 
        breakMinutes: 2,
        minutes: 0,
        seconds: 0,
        work: true,
        start: false,
    }
}

componentDidMount(){
    if (this.state.work) {
        this.setState({
          minutes: this.state.workMinutes,
          seconds: this.state.workSeconds,
        })
      } 
      else {
        this.setState({
          minutes: this.state.breakMinutes,
          seconds: this.state.workSeconds,
        })
      }

     this.interval = setInterval(this.inc, 1000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

inc = () => {
    if (this.state.start){
    if (this.state.seconds == 0 && this.state.minutes == 0) {
       
        this.setState(prevState => ({
          work: !prevState.work
        }));
        if (this.state.work) {
            this.setState({
              minutes: this.state.workMinutes,
              seconds: this.state.workSeconds,
            })
          } 
          else {
            this.setState({
              minutes: this.state.breakMinutes,
              seconds: this.state.workSeconds,
            })
          }
    }

    if(this.state.seconds == 0){
        this.setState(prevState => ({ 
            seconds: 60,
            minutes: prevState.minutes - 1,
        }))
    }
    this.setState(prevState => ({
        seconds: prevState.seconds - 1,
    }))
}
}

startPress = () => {
    this.setState(prevState => ({
        start: !prevState.start
      }));
}

resetPress = () => {
    if (this.state.work) {
        this.setState({
          minutes: this.state.workMinutes,
          seconds: this.state.workSeconds,
        })
      } 
      else {
        this.setState({
          minutes: this.state.breakMinutes,
          seconds: this.state.workSeconds,
        })
      }
}

render(){
    var textSeconds = this.state.seconds.toString()
    if (this.state.seconds.toString().length < 2) {
      textSeconds = "0" + this.state.seconds.toString()
    }
    return(
        
        <View style={styles.appContainer} >
        <Text style={styles.fontSize2}>Pomodoro Timer!</Text>
        <Text style={styles.fontSize}>{this.state.minutes} : {textSeconds}</Text> 
        <View style={styles.buttonGroup}>
            {!this.state.start && <Button
            title="start"
            onPress= {this.startPress}/>}

            {this.state.start && <Button
            title="stop"
            color="red"
            onPress= {this.startPress}/>}

            <Button
                onPress= {this.resetPress}
                title= "reset"
                />
          </View>
       
       
        
        </View>
    );
}

}

const styles = StyleSheet.create({
    appContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
      },
    fontSize:{
        fontSize: 30
    },
    fontSize2:{
        color: "red",
        fontSize: 30
    },
});

export default Timer;