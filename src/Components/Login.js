

import React,{Component} from 'react'
export class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             username:'',
             password:'',
             allUserDetails:[]
        }
    }
    onchange=(e)=>{
this.setState({
    [e.target.name]:e.target.value
})
    }

    componentWillMount=()=>{
        this.setState({
            allUserDetails:JSON.parse(localStorage.getItem('UsersData'))
        })
    }

    checkUserValid=()=>{
        const username=this.state.username
        const userpassword=this.state.password
        const AllUserDetails=this.state.allUserDetails

for(var user of AllUserDetails){
    // alert(user.Password)

    if(username==user.Email && userpassword ==user.Password && user.isAdmin==true){
        this.props.history.push('/admin')
     
     }
     
    else if(username==user.Email && userpassword ==user.Password && user.isAdmin==false){
       this.props.history.push(`/leaveapp/${username}`)
    alert('login successfull')
    }
    
   
}

    }

    Signup=()=>{
        this.props.history.push('/signup')
    }
    render() {
        return (
            <div className='container center form-group'>
                <center>
                    <h3> Log In </h3>
                    <div className="row"> 
                    <form autoComplete='off' className="m-5 col-md-10">
                        <div className='row'> 
                        <div className='input-field col s12'>
                            <input type='text' name='username' placeholder='username' value={this.state.username} onChange={this.onchange} className='form-control validate'/>
                             </div>
                        </div>
                        <div className='row'> 
                        <div className='input-field col s12'>
                            <input type='password' name='password' placeholder='password' value={this.state.password} onChange={this.onchange} className='form-control validate'/>
                             </div>
                        </div>



<button type='button' className='btn btn-primary ' onClick={this.checkUserValid}> LogIn</button>&nbsp;&nbsp;&nbsp;
<button type='button' className='btn btn-primary ' onClick={this.Signup}> SignUp </button>

                    </form>


                    </div>
                </center>
            </div>
        )
    }
}

export default Login
