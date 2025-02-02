Common Cygwin Commands:
Here's a list of the commands you'll need to access the patch directory:

•ls -al -- lists the contents of your current directory
•cd .. -- moves you up to the parent directory (note the space between cd and .. if you come from a DOS background!)
•cd foldername -- moves you to a specific folder visible from your current directory
Steps to Patch a Drupal Module in Cygwin

Here are the basic steps you'll need to follow to patch your module:

 •Copy the patch file and original module to the same directory, one you can access via the Cygwin commands above.
•Run this command: patch filetobepatched < patchfile or patch -p0 < patchfile
Voila  Post any questions or comments below.

Windows Vista
If you're using Windows Visa, run Cygwin as an administrator. You'll also need to uncheck the "read only" flag on files you modify,
and adjust permissions (under the security tab) to allow full access for your user. Otherwise, you'll have trouble copying and 
uploading files - you'll get "permission denied" errors.

Assumptions

•cygwin is installed at c:\cygwin
•the patch is at c:\mypatch.patch
•The drupal installation is at c:\drupal
1.Start a cmd window
2.cd c:\drupal
3.c:\cygwin\bin\patch.exe -p0 < c:\mypatch.patch
After the patch is applied check for it saying that hunks failed. If it does it will create a reject(.rej) file where you can look at what has failed.

If there are no errors or it only states there are offsets then your patch has been applied successfully.

