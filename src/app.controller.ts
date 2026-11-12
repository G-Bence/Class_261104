import { Controller, Get, Post, Render, Body } from '@nestjs/common';
import { AppService } from './app.service.js';
import { EditProfileDto } from './editProfile.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getMainPage() {
    return {
      error: null
    }
  }

  @Post('/')
  @Render('index')
  editProfile(@Body() body: EditProfileDto) {
    const userRegex = /^[a-z][a-z\d_]*$/;
    const nicknameRegex = /^[a-zA-Z\d_\-\s]{3,}$/
    const profilePicRegex = /^https?:\/\/+[a-zA-Z0-9\-\.]+\.[jpg|png]{0,}$/;
    const backgroundRegex = /^#[a-fA-F0-9]{6}$/;

    if (!userRegex.test(body.username)) {
      return {
        error: "Invalid username"
      }
    }
    if (!nicknameRegex.test(body.nickname)) {
      return {
        error: "Invalid nickname"
      }
    }
    if (!profilePicRegex.test(body.profilePic)) {
      return {      
        error: "Invalid profile picture"
      }
    } 
    if (!backgroundRegex.test(body.background)) {
      return {
        error: "Invalid background color"
      }
    }
  }
}