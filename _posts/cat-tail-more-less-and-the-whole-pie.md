---
layout: post
title:  "NEW TITLE"
date:   2024-02-01
excerpt: "lorem ipsum"
img: "blog-headers/vr-movie.jpg" 
project: true  
---

My theory on
-Cat tail more less, and the whole pie 


1) more = to view a text file one page at a time, press spacebar to go to the next page

more filename : show the document one page at a time

more -num filename : show the document page few lines as specified bu (-num)

example : more -10 filename will show 10 lines for every page

.

2) less = is much the same as more command except:

a) You can navigate the page up/down using the less command and not possible in more command.

b) You can search a string in less command. (use /keywordto search)

c) “more” was fairly limited, and additional development on “more” had stopped

d) it uses same functions as vi editor

the usage : less filename

.

3) head = displays the first ten lines of a file, unless otherwise stated.

Examples

head myfile.txt – Would display the first ten lines of myfile.txt.

head -15 myfile.txt – Would display the first fifteen lines of myfile.txt.

.

4) tail = display the last part of the file

usage : tail filename

tail -n filename : display the last n lines of the file

.

5) cat = can be used to join multiple files together and print the result on screen (it will not show page by page)

usage:

cat 01.txt
to displat the contents of file 01.txt

cat 01.txt 02.txt
to display the contents of both files

cat file1.txt file2.txt > file3.txt – Reads file1.txt and file2.txt and  combines those files to make

cat note5 >> notes – attach note5 to notes

cat >> file1 – add additional data in file1

# CAT
cat has nothing to do with cats. It's short for catenate, and it dumps the contents of text files.  Cats think about lots of things, but not usually about text files.

# less

Sometimes you'll want to look at a really long file, one that takes up more room than you've got in your terminal.

less is what's known as a pager. It will display one page of a file at a time and let you scroll up and down through the file at your leisure.

/usr/share/dict/american-english is a long list of known words in American English. (If that's not available, try /usr/share/dict/words, which should point to the dictionary for your Pi's locale.) Try opening it in less.

# head and tail

Sometimes you just want a quick look at the beginning or end of a file. This is useful for getting a sense of the contents of very large files, and for seeing the latest additions to things like logs that routinely have new data appended to them.
