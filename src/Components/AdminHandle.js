import React, { Component } from 'react'

export class AdminHandle extends Component {
constructor(props) {
    super(props)

    this.state = {
         allviewApplication:[]
    }
}
componentDidMount(){
    var arr=JSON.parse(localStorage.getItem('leaveApplication'))||[]
    this.setState({
        allviewApplication:arr
    })
}

approveLeave=(e)=>{
var person=e.target.value
var arr=JSON.parse(localStorage.getItem('leaveApplication'))

for(var i=0;i<arr.length;i++){
    if(arr[i].App_id==person){
        arr[i].status='Approved'
        this.setState({
            allviewApplication:arr
        })
        break;
    }
}
localStorage.setItem('leaveApplication',JSON.stringify(arr))
}

rejectLeave=(e)=>{
    var person=e.target.value
    var arr=JSON.parse(localStorage.getItem('leaveApplication'))
    
    for(var i=0;i<arr.length;i++){
        if(arr[i].App_id==person){
            arr[i].status='Rejected'
            this.setState({
                allviewApplication:arr
            })
            break;
        }
    }
    localStorage.setItem('leaveApplication',JSON.stringify(arr))
    }





    renderingViewApplication=()=>{
return this.state.allviewApplication.map((application,index)=>{
    const {name,App_id,from,to,status}=application
    return (
        <tr key={index}>
            <td> {name}</td>
            <td> {from}</td>
            <td> {to}</td>
            <td> {status}</td>
            <td> 
                <button onClick={this.approveLeave} value={App_id} className="btn btn-primary"> Approve</button>&nbsp;&nbsp;&nbsp;
                <button onClick={this.rejectLeave} value={App_id} className='btn btn-primary'> Reject</button>
                        
            </td>


        </tr>
    )
})
    }
    signOut=()=>{
        this.props.history.push('/login')
    }
    render() {
        return (
            <div className='container'>
                <h2> welcome Admin</h2>
                <center><h3 className='text-danger'>   Leave summary   </h3>  </center>
                <button type="button" className='btn btn-primary right' onClick={this.signOut}> Sign Out </button>     

               <table className='table table-hover striped m-5' border='1'>
                   <tr>
                   <th scope='col'>UserName </th>
                            <th scope='col'>From </th>
                            <th scope='col'>to </th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Action </th>
                   </tr>
                   {this.renderingViewApplication()}

               </table>
            </div>
        )
    }
}

export default AdminHandle

