export function exportCode(code: string, language: string, filename?: string) {
  const fileExtensions: { [key: string]: string } = {
    javascript: 'js',
    typescript: 'ts',
    python: 'py',
    html: 'html',
    css: 'css',
    scss: 'scss',
    json: 'json',
    xml: 'xml',
    markdown: 'md',
    yaml: 'yml',
    sql: 'sql',
    java: 'java',
    cpp: 'cpp',
    c: 'c',
    csharp: 'cs',
    go: 'go',
    rust: 'rs',
    php: 'php',
    ruby: 'rb',
    swift: 'swift',
    kotlin: 'kt',
    dart: 'dart',
    scala: 'scala',
    r: 'r',
    matlab: 'm',
    perl: 'pl',
    shell: 'sh',
    batch: 'bat',
    powershell: 'ps1',
    lua: 'lua',
    nim: 'nim',
    zig: 'zig',
    v: 'v',
    elm: 'elm',
    elixir: 'ex',
    erlang: 'erl',
    clojure: 'clj',
    haskell: 'hs',
    ocaml: 'ml',
    fsharp: 'fs',
    pascal: 'pas',
    d: 'd',
    julia: 'jl',
    crystal: 'cr',
    racket: 'rkt',
    scheme: 'scm',
    lisp: 'lisp',
    prolog: 'pro',
    assembly: 'asm',
    verilog: 'v',
    vhdl: 'vhd',
    vbnet: 'vb',
    visualbasic: 'vbs',
    autohotkey: 'ahk',
    autoit: 'au3',
    tcl: 'tcl',
    groovy: 'groovy',
    gradle: 'gradle',
    sbt: 'sbt',
    cmake: 'cmake',
    makefile: 'make',
    dockerfile: 'dockerfile',
    toml: 'toml',
    ini: 'ini',
    cfg: 'cfg',
    conf: 'conf',
    env: 'env',
    gitignore: 'gitignore',
    editorconfig: 'editorconfig'
  };

  const extension = fileExtensions[language] || 'txt';
  const defaultFilename = `code.${extension}`;
  const finalFilename = filename || defaultFilename;

  // Create blob and download
  const blob = new Blob([code], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = finalFilename;
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function getLanguageTemplate(language: string): string {
  const templates: { [key: string]: string } = {
    javascript: `// Welcome to Omni Code - JavaScript
console.log("Hello, World!");

function greet(name) {
  return \`Hello, \${name}!\`;
}

// Your code here...`,
    
    typescript: `// Welcome to Omni Code - TypeScript
interface User {
  name: string;
  age: number;
}

function greet(user: User): string {
  return \`Hello, \${user.name}!\`;
}

console.log("Hello, World!");

// Your code here...`,
    
    python: `# Welcome to Omni Code - Python
def greet(name):
    return f"Hello, {name}!"

def main():
    print("Hello, World!")
    
if __name__ == "__main__":
    main()

# Your code here...`,

    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Omni Code HTML</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>Welcome to Omni Code HTML editor.</p>
    
    <!-- Your HTML here... -->
</body>
</html>`,

    css: `/* Welcome to Omni Code - CSS */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
}

h1 {
    color: #333;
    text-align: center;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

/* Your CSS here... */`,

    scss: `// Welcome to Omni Code - SCSS
$primary-color: #007bff;
$secondary-color: #6c757d;
$border-radius: 8px;

body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 20px;
    border-radius: $border-radius;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    
    h1 {
        color: $primary-color;
        text-align: center;
    }
}

// Your SCSS here...`,

    json: `{
  "name": "Omni Code Project",
  "version": "1.0.0",
  "description": "A sample JSON file",
  "author": "Omni Code User",
  "dependencies": {
    "example": "^1.0.0"
  },
  "scripts": {
    "start": "node index.js",
    "test": "echo \\"Hello, World!\\""
  }
}`,

    xml: `<?xml version="1.0" encoding="UTF-8"?>
<root>
    <project name="Omni Code">
        <description>Welcome to Omni Code XML editor</description>
        <version>1.0.0</version>
        <items>
            <item id="1">Hello, World!</item>
            <item id="2">Sample XML content</item>
        </items>
    </project>
    
    <!-- Your XML here... -->
</root>`,

    markdown: `# Welcome to Omni Code - Markdown

## Getting Started

This is a **Markdown** editor where you can write formatted text using simple syntax.

### Features

- **Bold text** and *italic text*
- [Links](https://example.com)
- Lists and code blocks
- Tables and more!

### Code Example

\`\`\`javascript
console.log("Hello, World!");
\`\`\`

### Your Content Here...

Write your markdown content below:`,

    yaml: `# Welcome to Omni Code - YAML
project:
  name: "Omni Code"
  version: "1.0.0"
  description: "A sample YAML configuration"

settings:
  debug: true
  port: 3000
  database:
    host: "localhost"
    port: 5432
    name: "omnicode_db"

features:
  - "syntax highlighting"
  - "code execution"
  - "export functionality"
  - "dark mode"

# Your YAML here...`,

    sql: `-- Welcome to Omni Code - SQL
-- Sample database schema

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(200) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample queries
SELECT * FROM users;
SELECT u.username, p.title 
FROM users u 
JOIN posts p ON u.id = p.user_id;

-- Your SQL here...`,
    
    java: `// Welcome to Omni Code - Java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println(greet("Omni Code"));
    }
    
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
    
    // Your code here...
}`,
    
    cpp: `// Welcome to Omni Code - C++
#include <iostream>
#include <string>

std::string greet(const std::string& name) {
    return "Hello, " + name + "!";
}

int main() {
    std::cout << "Hello, World!" << std::endl;
    std::cout << greet("Omni Code") << std::endl;
    
    // Your code here...
    return 0;
}`,

    c: `// Welcome to Omni Code - C
#include <stdio.h>
#include <string.h>

void greet(const char* name) {
    printf("Hello, %s!\\n", name);
}

int main() {
    printf("Hello, World!\\n");
    greet("Omni Code");
    
    // Your code here...
    return 0;
}`,

    csharp: `// Welcome to Omni Code - C#
using System;

namespace OmniCode
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, World!");
            Console.WriteLine(Greet("Omni Code"));
        }
        
        static string Greet(string name)
        {
            return $"Hello, {name}!";
        }
        
        // Your code here...
    }
}`,

    go: `// Welcome to Omni Code - Go
package main

import "fmt"

func greet(name string) string {
    return fmt.Sprintf("Hello, %s!", name)
}

func main() {
    fmt.Println("Hello, World!")
    fmt.Println(greet("Omni Code"))
    
    // Your code here...
}`,

    rust: `// Welcome to Omni Code - Rust
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    println!("Hello, World!");
    println!("{}", greet("Omni Code"));
    
    // Your code here...
}`,

    php: `<?php
// Welcome to Omni Code - PHP

function greet($name) {
    return "Hello, " . $name . "!";
}

echo "Hello, World!" . PHP_EOL;
echo greet("Omni Code") . PHP_EOL;

// Your code here...
?>`,

    ruby: `# Welcome to Omni Code - Ruby

def greet(name)
  "Hello, #{name}!"
end

puts "Hello, World!"
puts greet("Omni Code")

# Your code here...`,

    swift: `// Welcome to Omni Code - Swift
import Foundation

func greet(name: String) -> String {
    return "Hello, \\(name)!"
}

print("Hello, World!")
print(greet(name: "Omni Code"))

// Your code here...`,

    kotlin: `// Welcome to Omni Code - Kotlin
fun greet(name: String): String {
    return "Hello, $name!"
}

fun main() {
    println("Hello, World!")
    println(greet("Omni Code"))
    
    // Your code here...
}`,

    dart: `// Welcome to Omni Code - Dart
String greet(String name) {
  return 'Hello, $name!';
}

void main() {
  print('Hello, World!');
  print(greet('Omni Code'));
  
  // Your code here...
}`,

    scala: `// Welcome to Omni Code - Scala
object Main {
  def greet(name: String): String = {
    s"Hello, $name!"
  }
  
  def main(args: Array[String]): Unit = {
    println("Hello, World!")
    println(greet("Omni Code"))
    
    // Your code here...
  }
}`,

    r: `# Welcome to Omni Code - R
greet <- function(name) {
  paste("Hello,", name, "!")
}

print("Hello, World!")
print(greet("Omni Code"))

# Your code here...`,

    matlab: `% Welcome to Omni Code - MATLAB
function result = greet(name)
    result = ['Hello, ' name '!'];
end

disp('Hello, World!');
disp(greet('Omni Code'));

% Your code here...`,

    perl: `#!/usr/bin/perl
# Welcome to Omni Code - Perl

sub greet {
    my $name = shift;
    return "Hello, $name!";
}

print "Hello, World!\\n";
print greet("Omni Code") . "\\n";

# Your code here...`,

    shell: `#!/bin/bash
# Welcome to Omni Code - Shell Script

greet() {
    echo "Hello, $1!"
}

echo "Hello, World!"
greet "Omni Code"

# Your code here...`,

    batch: `@echo off
REM Welcome to Omni Code - Batch Script

echo Hello, World!
echo Hello, Omni Code!

REM Your code here...`,

    powershell: `# Welcome to Omni Code - PowerShell

function Greet {
    param([string]$Name)
    return "Hello, $Name!"
}

Write-Host "Hello, World!"
Write-Host (Greet "Omni Code")

# Your code here...`,

    lua: `-- Welcome to Omni Code - Lua
function greet(name)
    return "Hello, " .. name .. "!"
end

print("Hello, World!")
print(greet("Omni Code"))

-- Your code here...`,

    nim: `# Welcome to Omni Code - Nim
proc greet(name: string): string =
  "Hello, " & name & "!"

echo "Hello, World!"
echo greet("Omni Code")

# Your code here...`,

    zig: `// Welcome to Omni Code - Zig
const std = @import("std");

fn greet(name: []const u8) void {
    std.debug.print("Hello, {s}!\\n", .{name});
}

pub fn main() void {
    std.debug.print("Hello, World!\\n", .{});
    greet("Omni Code");
    
    // Your code here...
}`,

    v: `// Welcome to Omni Code - V
fn greet(name string) string {
    return 'Hello, $name!'
}

fn main() {
    println('Hello, World!')
    println(greet('Omni Code'))
    
    // Your code here...
}`,

    elm: `-- Welcome to Omni Code - Elm
module Main exposing (..)

import Html exposing (text)

greet : String -> String
greet name =
    "Hello, " ++ name ++ "!"

main =
    text (greet "Omni Code")

-- Your code here...`,

    elixir: `# Welcome to Omni Code - Elixir
defmodule Main do
  def greet(name) do
    "Hello, #{name}!"
  end
  
  def main do
    IO.puts("Hello, World!")
    IO.puts(greet("Omni Code"))
  end
end

Main.main()

# Your code here...`,

    erlang: `% Welcome to Omni Code - Erlang
-module(main).
-export([greet/1, main/0]).

greet(Name) ->
    "Hello, " ++ Name ++ "!".

main() ->
    io:format("Hello, World!~n"),
    io:format("~s~n", [greet("Omni Code")]).

% Your code here...`,

    clojure: `; Welcome to Omni Code - Clojure
(defn greet [name]
  (str "Hello, " name "!"))

(println "Hello, World!")
(println (greet "Omni Code"))

; Your code here...`,

    haskell: `-- Welcome to Omni Code - Haskell
greet :: String -> String
greet name = "Hello, " ++ name ++ "!"

main :: IO ()
main = do
    putStrLn "Hello, World!"
    putStrLn (greet "Omni Code")
    
-- Your code here...`,

    ocaml: `(* Welcome to Omni Code - OCaml *)
let greet name = "Hello, " ^ name ^ "!"

let () =
  print_endline "Hello, World!";
  print_endline (greet "Omni Code")

(* Your code here... *)`,

    fsharp: `// Welcome to Omni Code - F#
let greet name = sprintf "Hello, %s!" name

[<EntryPoint>]
let main argv =
    printfn "Hello, World!"
    printfn "%s" (greet "Omni Code")
    0

// Your code here...`,

    pascal: `// Welcome to Omni Code - Pascal
program Main;

function Greet(name: string): string;
begin
    Greet := 'Hello, ' + name + '!';
end;

begin
    writeln('Hello, World!');
    writeln(Greet('Omni Code'));
    
    // Your code here...
end.`,

    d: `// Welcome to Omni Code - D
import std.stdio;

string greet(string name) {
    return "Hello, " ~ name ~ "!";
}

void main() {
    writeln("Hello, World!");
    writeln(greet("Omni Code"));
    
    // Your code here...
}`,

    julia: `# Welcome to Omni Code - Julia
function greet(name)
    "Hello, $name!"
end

println("Hello, World!")
println(greet("Omni Code"))

# Your code here...`,

    crystal: `# Welcome to Omni Code - Crystal
def greet(name : String) : String
  "Hello, #{name}!"
end

puts "Hello, World!"
puts greet("Omni Code")

# Your code here...`,

    racket: `#lang racket
; Welcome to Omni Code - Racket

(define (greet name)
  (string-append "Hello, " name "!"))

(displayln "Hello, World!")
(displayln (greet "Omni Code"))

; Your code here...`,

    scheme: `; Welcome to Omni Code - Scheme
(define (greet name)
  (string-append "Hello, " name "!"))

(display "Hello, World!")
(newline)
(display (greet "Omni Code"))
(newline)

; Your code here...`,

    lisp: `; Welcome to Omni Code - Common Lisp
(defun greet (name)
  (concatenate 'string "Hello, " name "!"))

(format t "Hello, World!~%")
(format t "~a~%" (greet "Omni Code"))

; Your code here...`,

    prolog: `% Welcome to Omni Code - Prolog
greet(Name, Greeting) :-
    atom_concat('Hello, ', Name, Temp),
    atom_concat(Temp, '!', Greeting).

:- initialization(main).

main :-
    write('Hello, World!'), nl,
    greet('Omni Code', Greeting),
    write(Greeting), nl.

% Your code here...`,

    assembly: `; Welcome to Omni Code - Assembly (x86-64)
section .data
    hello db 'Hello, World!', 0xA, 0
    hello_len equ $ - hello

section .text
    global _start

_start:
    ; Write system call
    mov rax, 1          ; sys_write
    mov rdi, 1          ; stdout
    mov rsi, hello      ; message
    mov rdx, hello_len  ; message length
    syscall
    
    ; Exit system call
    mov rax, 60         ; sys_exit
    mov rdi, 0          ; exit status
    syscall

; Your code here...`,

    verilog: `// Welcome to Omni Code - Verilog
module hello_world;
    initial begin
        $display("Hello, World!");
        $display("Hello, Omni Code!");
        $finish;
    end
endmodule

// Your code here...`,

    vhdl: `-- Welcome to Omni Code - VHDL
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity hello_world is
end hello_world;

architecture Behavioral of hello_world is
begin
    process
    begin
        report "Hello, World!";
        report "Hello, Omni Code!";
        wait;
    end process;
end Behavioral;

-- Your code here...`,

    vbnet: `' Welcome to Omni Code - VB.NET
Module Main
    Function Greet(name As String) As String
        Return "Hello, " & name & "!"
    End Function
    
    Sub Main()
        Console.WriteLine("Hello, World!")
        Console.WriteLine(Greet("Omni Code"))
    End Sub
    
    ' Your code here...
End Module`,

    visualbasic: `' Welcome to Omni Code - Visual Basic Script
Function Greet(name)
    Greet = "Hello, " & name & "!"
End Function

WScript.Echo "Hello, World!"
WScript.Echo Greet("Omni Code")

' Your code here...`,

    autohotkey: `; Welcome to Omni Code - AutoHotkey
Greet(name) {
    return "Hello, " . name . "!"
}

MsgBox, Hello, World!
MsgBox, % Greet("Omni Code")

; Your code here...`,

    autoit: `; Welcome to Omni Code - AutoIt
Func Greet($name)
    Return "Hello, " & $name & "!"
EndFunc

MsgBox(0, "Greeting", "Hello, World!")
MsgBox(0, "Greeting", Greet("Omni Code"))

; Your code here...`,

    tcl: `# Welcome to Omni Code - Tcl
proc greet {name} {
    return "Hello, $name!"
}

puts "Hello, World!"
puts [greet "Omni Code"]

# Your code here...`,

    groovy: `// Welcome to Omni Code - Groovy
def greet(name) {
    return "Hello, $name!"
}

println "Hello, World!"
println greet("Omni Code")

// Your code here...`,

    gradle: `// Welcome to Omni Code - Gradle Build Script
plugins {
    id 'java'
    id 'application'
}

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.apache.commons:commons-lang3:3.12.0'
    testImplementation 'junit:junit:4.13.2'
}

application {
    mainClass = 'Main'
}

task hello {
    doLast {
        println 'Hello, World!'
        println 'Hello, Omni Code!'
    }
}

// Your code here...`,

    sbt: `// Welcome to Omni Code - SBT Build Script
ThisBuild / version := "0.1.0-SNAPSHOT"
ThisBuild / scalaVersion := "2.13.8"

lazy val root = (project in file("."))
  .settings(
    name := "omni-code-project",
    libraryDependencies ++= Seq(
      "org.scalatest" %% "scalatest" % "3.2.12" % Test
    )
  )

// Your code here...`,

    cmake: `# Welcome to Omni Code - CMake
cmake_minimum_required(VERSION 3.10)
project(OmniCode)

set(CMAKE_CXX_STANDARD 17)

add_executable(hello_world main.cpp)

message(STATUS "Hello, World!")
message(STATUS "Hello, Omni Code!")

# Your code here...`,

    makefile: `# Welcome to Omni Code - Makefile
CC=gcc
CFLAGS=-Wall -Wextra -std=c99

TARGET=hello_world
SOURCES=main.c

$(TARGET): $(SOURCES)
	$(CC) $(CFLAGS) -o $(TARGET) $(SOURCES)
	@echo "Hello, World!"
	@echo "Hello, Omni Code!"

clean:
	rm -f $(TARGET)

.PHONY: clean

# Your code here...`,

    dockerfile: `# Welcome to Omni Code - Dockerfile
FROM ubuntu:20.04

# Install dependencies
RUN apt-get update && apt-get install -y \\
    curl \\
    wget \\
    git \\
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Expose port
EXPOSE 3000

# Default command
CMD echo "Hello, World!" && echo "Hello, Omni Code!"

# Your code here...`,

    toml: `# Welcome to Omni Code - TOML Configuration
[project]
name = "Omni Code"
version = "1.0.0"
description = "A sample TOML configuration"

[settings]
debug = true
port = 3000

[database]
host = "localhost"
port = 5432
name = "omnicode_db"

[features]
syntax_highlighting = true
code_execution = true
export_functionality = true
dark_mode = true

# Your configuration here...`,

    ini: `; Welcome to Omni Code - INI Configuration
[Project]
Name=Omni Code
Version=1.0.0
Description=A sample INI configuration

[Settings]
Debug=true
Port=3000

[Database]
Host=localhost
Port=5432
Name=omnicode_db

; Your configuration here...`,

    cfg: `# Welcome to Omni Code - Configuration File
[project]
name = Omni Code
version = 1.0.0
description = A sample configuration file

[settings]
debug = true
port = 3000

[database]
host = localhost
port = 5432
name = omnicode_db

# Your configuration here...`,

    conf: `# Welcome to Omni Code - Configuration File
# This is a sample configuration file

project.name = "Omni Code"
project.version = "1.0.0"
project.description = "A sample configuration"

settings.debug = true
settings.port = 3000

database.host = "localhost"
database.port = 5432
database.name = "omnicode_db"

# Your configuration here...`,

    env: `# Welcome to Omni Code - Environment Variables
# This is a sample .env file

PROJECT_NAME="Omni Code"
PROJECT_VERSION="1.0.0"
PROJECT_DESCRIPTION="A sample environment configuration"

DEBUG=true
PORT=3000

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=omnicode_db

# Your environment variables here...`,

    gitignore: `# Welcome to Omni Code - .gitignore
# This is a sample .gitignore file

# Dependencies
node_modules/
vendor/

# Build outputs
dist/
build/
target/
bin/
obj/

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Environment variables
.env
.env.local

# Logs
*.log
logs/

# Your ignore patterns here...`,

    editorconfig: `# Welcome to Omni Code - EditorConfig
# This is a sample .editorconfig file

root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2

[*.{js,ts,jsx,tsx}]
indent_size = 2

[*.{py,java,cpp,c,cs}]
indent_size = 4

[*.go]
indent_style = tab

[*.md]
trim_trailing_whitespace = false

# Your editor configuration here...`
  };

  return templates[language] || `// Welcome to Omni Code - ${language.charAt(0).toUpperCase() + language.slice(1)}
// Start coding here...`;
}