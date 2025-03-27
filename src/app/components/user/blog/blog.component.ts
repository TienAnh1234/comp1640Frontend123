import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  user = {
    name: 'HuânRose',
    job: 'Company · Location · Job Title',
    avatar: 'https://storage.googleapis.com/a1aa/image/U2dbW2EXMRpU-FAue0i2T6aWD1tAFwEf05GcfUmgyGQ.jpg',
  };

  blogs = [
    {
      author: 'HuânRose',
      avatar: 'https://storage.googleapis.com/a1aa/image/U2dbW2EXMRpU-FAue0i2T6aWD1tAFwEf05GcfUmgyGQ.jpg',
      title: 'Blog Title 1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae erat sed tortor vehicula luctus.',
    },
    {
      author: 'Experience',
      avatar: 'https://storage.googleapis.com/a1aa/image/r3KdSRXNw8Lwtz4p8LTMVDspm0xadgqQ-SNBSJ2p2tk.jpg',
      title: 'Blog Title 2',
      content: 'Quisque vitae justo eget neque sollicitudin tincidunt vel eget urna. Suspendisse potenti.',
    },
    {
      author: 'Project',
      avatar: 'https://storage.googleapis.com/a1aa/image/vorzD2FZR6El61H2mN-PTviBzlDjMyYX_VjD_zlyNfM.jpg',
      title: 'Blog Title 3',
      content: 'Sed faucibus orci sit amet turpis fermentum, ut tristique lacus rhoncus. Integer ut ligula non eros.',
    },
  ];

}
