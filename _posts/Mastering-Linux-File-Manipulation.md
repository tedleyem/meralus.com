---
layout: post
title:  "NEW TITLE"
date:   2024-02-01
excerpt: "lorem ipsum"
img: "blog-headers/vr-movie.jpg" 
project: true  
---

My theory on

Navigating the world of Linux commands can be rewarding yet daunting, particularly when dealing with file content management. In this article, we’ll delve into the powerful trio of cat, head, and tail, demonstrating their practical applications and streamlining your Linux experience.

Prepare to master these crucial commands in no time!
1.0 Cat: The Swiss Army Knife of File Manipulation

Originally designed for concatenating and displaying files, cat has evolved into a multi-purpose tool with various uses.

Let’s explore its functionality.
1.1 Display File Contents

Cat’s primary use is displaying text file content.

1
2
3

	

# Display file contents
$ cat file.txt
Hello World!

Tip
Cat is a safer alternative to text editors like vim, vi, or nano for viewing file contents, as it allows reading data without risking accidental edits.
1.2 Merge Multiple Files

Cat allows merging (concatenating) files into a single, larger file with one command.

1
2

	

# Combine multiple files into a single file
cat file1.txt file2.txt > combined.txt

1.3 Write data to a file

Cat excels at writing data to files. With shell redirection operators, creating, overwriting, or appending data to any file becomes simple.
Overwrite a file

To overwrite or create a new file with cat, use the redirection operator > followed by the filename. Type the data, press Ctrl-D to save and exit.

1
2
3

	

cat > myfile.txt
This is the new content of the file.
(Press Ctrl-D to save and exit)

Append data to a file:

To append data without overwriting, use the append redirection operator ». This operator adds new data to the end of the file, preserving the existing content.

1
2
3

	

cat >> myfile.txt
This text will be appended to the existing content.
(Press Ctrl-D to save and exit)

By using shell redirection operators (> and ») and pressing Ctrl-D to save and exit, you can effortlessly manage file content with cat.
Tip

Echo is an alternative for overwriting or appending data to a file.

1
2
3
4
5

	

# Overwrite a file
$ echo "New content" > myfile.txt

# Append to a file
$ echo "Appended content" >> myfile.txt

2.0 Head: A Glimpse at the Beginning

Head displays the top (or ‘head’) of a file. By default, it shows the first 10 lines.

1
2
3
4
5
6

	

# Get the top 10 lines from a file
$ head myfile.txt
Line 1
Line 2
...
Line 10

Use the -n option to specify a different number of lines.

1
2
3
4
5
6

	

# Get the top 15 lines from a file
$ head -n 15 myfile.txt
Line 1
Line 2
...
Line 15

3.0 Tail: Peeking at the End

Tail displays the bottom (or ’tail’) of a file. By default, it shows the last 10 lines.

1
2
3
4
5
6

	

# Get the last 10 lines from a file
$ tail myfile.txt
Line 11
...
Line 19
Line 20

Use the -n option to specify a different number of lines.

1
2
3
4
5
6

	

# Get the last 15 lines from a file
$ tail -n 15 myfile.txt
Line 5
...
Line 19
Line 20

3.1 Real-time monitoring

With the -f option, tail follows file contents in real-time, displaying new lines as they’re written. tail monitors file attributes and detects new data using system calls. This allows monitoring and displaying changes in real-time.
Info
When using tail -f to monitor a file, changes made in vim may not appear because vim creates a new temporary file upon saving, resulting in a different inode number. Tail -f continues to track the original inode, missing the updates made in vim.
4.0 Less: Paginated view

Less is an advanced file viewer for displaying and navigating large files or text data spanning multiple screens on the Linux command line. Unlike cat, which outputs the entire file content at once, less presents data in a scrollable, paginated manner.

With its ability to search for text using regular expressions and dynamically update the display when file content changes, less is particularly useful for browsing large log files or analyzing complex command pipelines, offering a more interactive and user-friendly experience compared to using head and tail alone.
