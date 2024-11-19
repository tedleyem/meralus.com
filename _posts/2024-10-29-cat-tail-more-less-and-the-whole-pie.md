---
layout: post
title:  "Cat tail more less, and the whole pie"
date:   2024-10-28
excerpt: "cheat sheet for docker"
img: "blog-headers/read-files-cat.png"
project: true
---

### **There are a million ways to skin a cat, but who skins cats?**

Anyway, heres a few commands to use on Linux systems via CLI to read the contents of a file.

Commands:
* more
* less
* head
* tail
* cat


# **more**
more is a tool for viewing text files, typically used for large files like logs. When using more, press spacebar to go to the next page

Examples using a file named logs.txt
```
more logs.txt # show the document one page at a time
```
```
more -num logs.txt # show the document page few lines as specified bu (-num)
```

```
more -10 filename will show 10 lines for every page
```

# **less**
less is more of the same as more command except:

* You can navigate the page up/down using the less command but not in more command.
* You can search a string in less command. (use /keyword to search through the file)
* more is limited, and development on “more” had stopped
* it uses the same functions as vi editor

less is sometimes considered a pager. It will display one page of a file at a time and let you scroll up and down through the file at your leisure.


Examples using a file named logs.txt
```
less logs.txt
```
# **head**
head displays the first ten lines of a file, unless otherwise stated.

Example
```
head myfile.txt # Displays the first ten lines of myfile.txt.
```
```
head -15 myfile.txt #Displays the first fifteen lines of myfile.txt.
```

# **tail**
tail display the last part of the file

Examples
```
tail filename : display the last 10 lines of the file
```
```
tail -n 20 filename : display the last 20 lines of the file
```

# **cat**
cat has nothing to do with cats. It's short for **catenate**, which dumps the contents of text files.  Cats think about lots of things, but not usually about text files. cat can be used to join multiple files together and print the result on screen (it will not show page by page)

Examples:
```
cat logs.txt # to display all the contents of file logs.txt
```
```
cat 01.txt 02.txt # to display the contents of both files
```
```
cat file1.txt file2.txt > file3.txt # Reads file1.txt and file2.txt and  combines those files to make
```
```
cat note5 >> notes #attach note5 to notes
```
```
cat >> file1 # add additional data in file1
```


# **man**
A man page (short for manual page) is a form of software documentation usually found on a Unix or Unix-like operating system.
If you want a quick tutorial on how to use a command, there is most likely a manual added to the command on a linux system.
Much like the '--help' or the '-h' flag on some commands the man pages will give you a full description of the command and
its intended use.

Example:
```
man cat
```

Example Output:
![man-pages](/assets/img/blog/man-cat-img.png)
